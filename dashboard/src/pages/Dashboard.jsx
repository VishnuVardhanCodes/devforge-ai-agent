import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import PromptBox from '../components/PromptBox';
import FileExplorer from '../components/FileExplorer';
import Terminal from '../components/Terminal';
import PreviewPanel from '../components/PreviewPanel';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [fileTree, setFileTree] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFileTree = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFileTree(data);
    } catch (err) {
      console.error('Failed to fetch file tree', err);
    }
  };

  const handleGenerate = async (prompt) => {
    setLogs([`🚀 Received prompt: "${prompt}"`, '▶ Invoking pipeline-orchestrator...']);
    setResult(null);
    setFileTree([]);
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop();

        for (const part of parts) {
          if (part.startsWith('data:')) {
            try {
              const json = JSON.parse(part.slice(5).trim());
              if (json.type === 'log') {
                const lines = json.message.split('\n').filter(l => l.trim());
                setLogs(prev => [...prev, ...lines]);
              } else if (json.type === 'done') {
                setResult({ message: json.code === 0 ? '✅ DevForge pipeline completed successfully!' : `❌ Pipeline exited with code ${json.code}` });
                await fetchFileTree();
                setLoading(false);
              }
            } catch (e) {
              // skip malformed chunk
            }
          }
        }
      }
    } catch (err) {
      setLogs(prev => [...prev, `❌ Error: ${err.message}`]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col">
        <PromptBox onGenerate={handleGenerate} loading={loading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Explorer */}
          <div className="lg:col-span-3">
            <FileExplorer fileTree={fileTree} />
          </div>
          
          {/* Terminal */}
          <div className="lg:col-span-9">
            <Terminal logs={logs} />
          </div>
        </div>

        <PreviewPanel result={result} />
      </main>
    </div>
  );
};

export default Dashboard;
