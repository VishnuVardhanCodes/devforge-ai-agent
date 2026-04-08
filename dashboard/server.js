import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
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
    res.write(`data: ${JSON.stringify({ type: 'done', code })}\n\n`);
    res.end();
  });
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
  try {
    if (!fs.existsSync(DEMO_OUTPUT_DIR)) {
      return res.json([]);
    }
    const tree = scanDir(DEMO_OUTPUT_DIR);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('API Server running on port 3001');
});
