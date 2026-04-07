import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PromptBox from '../components/PromptBox';
import FileExplorer from '../components/FileExplorer';
import Terminal from '../components/Terminal';
import PreviewPanel from '../components/PreviewPanel';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const handleGenerate = (prompt) => {
    setLogs((prev) => [...prev, `🚀 Received prompt: "${prompt}"`, '▶ Invoking pipeline-orchestrator...']);
    setResult(null);

    // Mock realistic progression
    setTimeout(() => {
      setLogs((prev) => [...prev, '▶ [1/7] generate-project: Creating files...']);
    }, 600);
    setTimeout(() => {
      setLogs((prev) => [...prev, '  ∟ Created: package.json', '  ∟ Created: src/index.js']);
    }, 1200);
    setTimeout(() => {
      setLogs((prev) => [...prev, '▶ [4/7] test-generator: Validating files...']);
    }, 2000);
    setTimeout(() => {
      setLogs((prev) => [...prev, '✅ All pipeline steps completed successfully!']);
      setResult({ message: 'DevForge API running successfully' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col">
        <PromptBox onGenerate={handleGenerate} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Explorer */}
          <div className="lg:col-span-3">
            <FileExplorer />
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
