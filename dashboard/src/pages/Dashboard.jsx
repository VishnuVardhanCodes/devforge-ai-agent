import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PromptBox from '../components/PromptBox';
import FileExplorer from '../components/FileExplorer';
import ProjectSidebar from '../components/ProjectSidebar';
import Terminal from '../components/Terminal';
import PreviewPanel from '../components/PreviewPanel';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [fileTree, setFileTree] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New State
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [runningProjectUrl, setRunningProjectUrl] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
      if (data.length > 0 && !selectedProject) {
        handleSelectProject(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  const fetchFileTree = async (project) => {
    try {
      const res = await fetch(`/api/files?project=${project.name}`);
      const data = await res.json();
      setFileTree(data);
    } catch (err) {
      console.error('Failed to fetch file tree', err);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setFileContent(null);
    fetchFileTree(project);
  };

  const handleFileSelect = async (file) => {
    try {
      const res = await fetch(`/api/file-content?filePath=${file.path}`);
      const data = await res.json();
      setFileContent({ ...data, path: file.path });
    } catch (err) {
      console.error('Failed to fetch file content', err);
    }
  };

  const handleRunProject = async (projectName) => {
    setLogs(prev => [...prev, `⚡ Starting project: ${projectName}...`]);
    setFileContent(null);
    setRunningProjectUrl(null);

    try {
      const response = await fetch('/api/run-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName }),
      });

      if (!response.body) return;

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
              } else if (json.type === 'url') {
                setRunningProjectUrl(json.url);
                setLogs(prev => [...prev, `🚀 Project running at: ${json.url}`]);
              }
            } catch (e) {
              // skip malformed chunk
            }
          }
        }
      }
    } catch (err) {
      setLogs(prev => [...prev, `❌ Run Error: ${err.message}`]);
    }
  };

  const handleStopProject = async () => {
    if (!selectedProject) return;
    try {
      await fetch('/api/stop-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName: selectedProject.name }),
      });
      setRunningProjectUrl(null);
      setLogs(prev => [...prev, `⏹ Project stopped.`]);
    } catch (err) {
      console.error('Failed to stop project', err);
    }
  };

  const handleGenerate = async (prompt) => {
    setLogs([`🚀 Received prompt: "${prompt}"`, '▶ Invoking pipeline-orchestrator...']);
    setResult(null);
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
                setLoading(false);
                
                // Refresh projects
                const projectsRes = await fetch('/api/projects');
                const projectsData = await projectsRes.json();
                setProjects(projectsData);
                
                // Auto-run the latest project
                if (projectsData.length > 0) {
                  const latest = projectsData[0]; 
                  handleSelectProject(latest);
                  handleRunProject(latest.name);
                }
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
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans text-slate-200 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />
      
      <main className="flex-1 w-full flex p-6 gap-6 overflow-hidden relative z-10">
        {/* Left Sidebar - Project List */}
        <aside className="w-80 hidden lg:flex flex-col flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
          <ProjectSidebar 
            projects={projects} 
            selectedProject={selectedProject} 
            onSelectProject={handleSelectProject} 
          />
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex-shrink-0 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
            <PromptBox onGenerate={handleGenerate} loading={loading} />
          </div>
          
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {/* File Explorer (Col 1-3) */}
            <div className="lg:col-span-3 flex flex-col overflow-hidden">
              <FileExplorer 
                fileTree={fileTree} 
                projectName={selectedProject?.name}
                onFileSelect={handleFileSelect}
                selectedFilePath={fileContent?.path}
              />
            </div>
            
            {/* Split View: Preview (Col 4-12) */}
            <div className="lg:col-span-9 flex flex-col gap-6 overflow-hidden">
              <div className="flex-1 min-h-0 overflow-hidden">
                <PreviewPanel 
                  selectedProject={selectedProject}
                  runningProjectUrl={runningProjectUrl}
                  onRunProject={handleRunProject}
                  onStopProject={handleStopProject}
                  fileContent={fileContent}
                />
              </div>
              
              <div className="flex-shrink-0 overflow-hidden">
                <Terminal logs={logs} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Utility Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}} />
    </div>
  );
};

export default Dashboard;

