const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let clients = [];

function broadcastLog(message) {
    const data = `data: ${JSON.stringify({ message: message })}\n\n`;
    clients.forEach(client => client.res.write(data));
}

app.post('/run-pipeline', (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, error: "Prompt is required" });

    let escapedPrompt = prompt.replace(/"/g, '\\"');
    broadcastLog(`🚀 Starting Pipeline Orchestrator for prompt: "${escapedPrompt}"...`);

    // Command name: gitclaw.cmd or gitclaw
    const cmd = process.platform === 'win32' ? 'gitclaw.cmd' : './gitclaw';
    
    const env = { 
        ...process.env, 
        PATH: `${path.join(__dirname, '..', 'mock-bin')};${path.join(__dirname, '..', 'node_modules', '.bin')};${process.env.PATH}` 
    };

    const child = spawn(cmd, ['run', 'pipeline-orchestrator', '-d', '.', '--demo', `"${escapedPrompt}"`], {
        cwd: path.join(__dirname, '..'),
        shell: true, // Required for .cmd on Windows
        env: env
    });

    let fullLogs = "";

    child.stdout.on('data', (data) => {
        const msg = data.toString();
        fullLogs += msg;
        broadcastLog(msg);
    });

    child.stderr.on('data', (data) => {
        const msg = data.toString();
        fullLogs += msg;
        broadcastLog(msg);
    });

    child.on('close', (code) => {
        const status = code === 0 ? "SUCCESS" : "FAILED";
        broadcastLog(`\n--- PIPELINE ${status} (Exit Code: ${code}) ---`);
        
        // Final response for the POST request
        if (!res.headersSent) {
            res.json({ success: code === 0, logs: fullLogs });
        }
    });
});

app.get('/logs', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    req.on('close', () => {
        clients = clients.filter(c => c.id !== clientId);
    });
});

app.get('/download-project', (req, res) => {
    try {
        const outputDir = path.join(__dirname, '..', 'demo-output');
        if (!fs.existsSync(outputDir)) {
            return res.status(404).send('demo-output folder not found.');
        }

        const zip = new AdmZip();
        zip.addLocalFolder(outputDir);
        const zipBuffer = zip.toBuffer();

        res.set('Content-Type', 'application/zip');
        res.set('Content-Disposition', 'attachment; filename="generated-project.zip"');
        res.send(zipBuffer);
    } catch (err) {
        console.error('Error creating zip:', err);
        res.status(500).send('Failed to create zip file.');
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 DevForge Dashboard Server`);
    console.log(`🔗 Local: http://localhost:${PORT}`);
});
