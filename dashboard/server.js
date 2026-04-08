import express from 'express';
import cors from 'cors';
import { exec, spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const ROOT_DIR = path.join(__dirname, '..');
const DEMO_OUTPUT_DIR = path.join(ROOT_DIR, 'demo-output');
const PROJECTS_FILE = path.join(DEMO_OUTPUT_DIR, 'projects.json');

let activeProcesses = {}; // { projectName: { child, port, type } }

// Strip ANSI escape codes from terminal output
const stripAnsi = (str) => str.replace(/\x1B\[[0-9;]*[a-zA-Z]|[\u001B\u009B][[\]()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><~]/g, '');

// Blocked folders to not recurse into
const SKIP_DIRS = new Set(['node_modules', '.git', '.cache', 'dist', 'build', '.next']);

app.post('/api/generate', (req, res) => {
  const { prompt } = req.body;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const safePrompt = prompt.replace(/"/g, '\\"');
  const child = exec(`node mock-claude.js -p "${safePrompt}"`, { cwd: ROOT_DIR });

  child.stdout.on('data', (data) => {
    const clean = stripAnsi(data.toString());
    const lines = clean.split('\n').filter(l => l.trim());
    for (const line of lines) {
      res.write(`data: ${JSON.stringify({ type: 'log', message: line })}\n\n`);
    }
  });

  child.stderr.on('data', (data) => {
    const clean = stripAnsi(data.toString());
    const lines = clean.split('\n').filter(l => l.trim());
    for (const line of lines) {
      res.write(`data: ${JSON.stringify({ type: 'log', message: line })}\n\n`);
    }
  });

  child.on('close', (code) => {
    discoverProjects();
    res.write(`data: ${JSON.stringify({ type: 'done', code })}\n\n`);
    res.end();
  });
});

function detectProjectType(projPath) {
  const pkgPath = path.join(projPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['react']) return 'react';
      if (deps['express'] || deps['fastify'] || pkg.main) return 'node';
    } catch (e) {
      console.error('Error parsing package.json', e);
    }
  }
  if (fs.existsSync(path.join(projPath, 'index.html'))) return 'static';
  return 'unknown';
}

function discoverProjects() {
  if (!fs.existsSync(DEMO_OUTPUT_DIR)) fs.mkdirSync(DEMO_OUTPUT_DIR);
  
  let existingProjects = [];
  if (fs.existsSync(PROJECTS_FILE)) {
    try {
      existingProjects = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    } catch (e) {
      existingProjects = [];
    }
  }

  const items = fs.readdirSync(DEMO_OUTPUT_DIR);
  const projects = items
    .filter(item => {
      const fullPath = path.join(DEMO_OUTPUT_DIR, item);
      return fs.statSync(fullPath).isDirectory() && !SKIP_DIRS.has(item);
    })
    .map(name => {
      const fullPath = path.join(DEMO_OUTPUT_DIR, name);
      const existing = existingProjects.find(p => p.name === name);
      const type = detectProjectType(fullPath);
      
      return {
        name,
        type,
        path: fullPath,
        created: existing ? existing.created : new Date().toISOString(),
        runCommand: type === 'react' ? 'npm run dev' : (type === 'node' ? 'node src/index.js' : null),
        previewUrl: existing ? existing.previewUrl : null
      };
    });

  const sortedProjects = projects.sort((a, b) => new Date(b.created) - new Date(a.created));

  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(sortedProjects, null, 2));
  return sortedProjects;
}

app.get('/api/projects', (req, res) => {
  res.json(discoverProjects());
});

app.get('/api/file-content', (req, res) => {
  const { filePath } = req.query;
  if (!filePath) return res.status(400).json({ error: 'filePath is required' });
  
  const fullPath = path.join(DEMO_OUTPUT_DIR, filePath);
  try {
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      res.json({ content });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/run-project', (req, res) => {
  const { projectName } = req.body;
  const project = discoverProjects().find(p => p.name === projectName);
  
  if (!project) return res.status(404).json({ error: 'Project not found' });
  
  const projPath = project.path;
  const type = project.type;
  let port = type === 'react' ? 5174 : 3000;
  let url = `http://localhost:${port}`;

  if (activeProcesses[projectName]) {
    // Project is already running, setup SSE and send URL immediately
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.write(`data: ${JSON.stringify({ type: 'log', message: `✅ Project '${projectName}' is already running.` })}\n\n`);
    res.write(`data: ${JSON.stringify({ type: 'url', url: activeProcesses[projectName].url })}\n\n`);
    return res.end();
  }

  // Stop other running projects...
  Object.keys(activeProcesses).forEach(name => {
    if (activeProcesses[name].child) activeProcesses[name].child.kill();
    delete activeProcesses[name];
  });

  if (type === 'static') {
    return res.json({ url: `file://${path.join(projPath, 'index.html')}`, status: 'static' });
  }

  // SSE for logs
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const log = (msg) => res.write(`data: ${JSON.stringify({ type: 'log', message: msg })}\n\n`);

  log(`📦 Preparing project: ${projectName}...`);
  
  // npm install if node_modules doesn't exist
  const runInstall = !fs.existsSync(path.join(projPath, 'node_modules'));
  
  const startProject = () => {
    log(`▶ Starting project...`);
    let cmd, args;
    if (type === 'react') {
      cmd = 'npm';
      args = ['run', 'dev', '--', '--port', port.toString()];
    } else {
      // Node project
      const pkg = JSON.parse(fs.readFileSync(path.join(projPath, 'package.json'), 'utf8'));
      const entry = pkg.main || 'src/index.js';
      cmd = 'node';
      args = [entry];
    }

    const child = spawn(cmd, args, { cwd: projPath, shell: true });
    activeProcesses[projectName] = { child, port, type, url };

    // Improved startup detection
    let urlSent = false;
    const sendUrl = () => {
      if (urlSent) return;
      urlSent = true;
      res.write(`data: ${JSON.stringify({ type: 'url', url: activeProcesses[projectName].url })}\n\n`);
    };

    child.stdout.on('data', (data) => {
      const clean = stripAnsi(data.toString());
      log(clean);
      
      // Auto-detect readiness and URL
      if (clean.includes('Local:') || clean.includes('http://localhost:') || clean.includes('ready in')) {
         const match = clean.match(/http:\/\/localhost:(\d+)/);
         if (match) {
           activeProcesses[projectName].port = match[1];
           activeProcesses[projectName].url = `http://localhost:${match[1]}`;
         }
         sendUrl();
      }
    });

    child.stderr.on('data', (data) => log(stripAnsi(data.toString())));
    
    child.on('close', (code) => {
      log(`Project process exited with code ${code}`);
      delete activeProcesses[projectName];
    });

    // Fallback: send URL anyway after 10 seconds if no signal detected
    setTimeout(sendUrl, 10000);
  };

  if (runInstall) {
    log(`⏳ Installing dependencies...`);
    const install = spawn('npm', ['install'], { cwd: projPath, shell: true });
    install.stdout.on('data', (data) => log(stripAnsi(data.toString())));
    install.stderr.on('data', (data) => log(stripAnsi(data.toString())));
    install.on('close', (code) => {
      if (code === 0) {
        log(`✅ Dependencies installed.`);
        startProject();
      } else {
        log(`❌ npm install failed with code ${code}`);
        res.end();
      }
    });
  } else {
    startProject();
  }
});

app.post('/api/stop-project', (req, res) => {
  const { projectName } = req.body;
  if (activeProcesses[projectName]) {
    activeProcesses[projectName].child.kill();
    delete activeProcesses[projectName];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Project not running' });
  }
});

function scanDir(dirPath) {
  let results = [];
  let list;
  try {
    list = fs.readdirSync(dirPath);
  } catch (e) {
    return results;
  }
  for (const file of list) {
    if (SKIP_DIRS.has(file)) continue;
    const fullPath = path.join(dirPath, file);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }
    if (stat && stat.isDirectory()) {
      results.push({ name: file, type: 'directory', children: scanDir(fullPath) });
    } else {
      results.push({ name: file, type: 'file', path: fullPath.replace(DEMO_OUTPUT_DIR, '').replace(/\\/g, '/') });
    }
  }
  return results;
}

app.get('/api/files', (req, res) => {
  const { project } = req.query;
  try {
    const targetDir = project ? path.join(DEMO_OUTPUT_DIR, project) : DEMO_OUTPUT_DIR;
    if (!fs.existsSync(targetDir)) {
      return res.json([]);
    }
    const tree = scanDir(targetDir);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('API Server running on port 3001');
});
