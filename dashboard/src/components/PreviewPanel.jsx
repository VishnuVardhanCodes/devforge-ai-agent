import React from 'react';

const PreviewPanel = ({ 
  selectedProject, 
  runningProjectUrl, 
  onRunProject, 
  onStopProject, 
  fileContent,
  logs = [] 
}) => {
  const isRunning = !!runningProjectUrl;

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-xl border border-slate-700 overflow-hidden transition-all flex flex-col h-[32rem]">
      <div className="bg-slate-800/80 border-b border-slate-700 p-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-semibold text-sm flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Live Preview
          </span>
          {isRunning && (
            <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {runningProjectUrl}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {selectedProject && !isRunning && (
            <button 
              onClick={() => onRunProject(selectedProject.name)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13L16 10 4.5 3.5z"/></svg>
              Run Project
            </button>
          )}
          
          {isRunning && (
            <>
              <button 
                onClick={onStopProject}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                Stop
              </button>
              <a 
                href={runningProjectUrl} 
                target="_blank" 
                rel="noreferrer"
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold px-3 py-1 rounded transition-colors flex items-center gap-1.5"
              >
                Launch
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 bg-slate-900 overflow-hidden relative">
        {fileContent ? (
          <div className="h-full flex flex-col">
            <div className="bg-slate-800/50 p-2 px-4 border-b border-slate-700 flex justify-between items-center">
              <span className="text-[11px] font-mono text-slate-400">{fileContent.path}</span>
              <button 
                onClick={() => {}} 
                className="text-slate-500 hover:text-slate-300 transition-colors"
                title="Copy content"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
              </button>
            </div>
            <pre className="flex-1 overflow-auto p-4 custom-scrollbar text-sm font-mono text-slate-300">
              <code>{fileContent.content}</code>
            </pre>
          </div>
        ) : isRunning ? (
          <iframe 
            src={runningProjectUrl} 
            className="w-full h-full border-none bg-white"
            title="Preview"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center group">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
               <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
               </svg>
            </div>
            <h3 className="text-slate-300 font-bold mb-2">Project Preview</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Select a project from the sidebar and click <strong>Run Project</strong> to see it live, or explore files to view their source.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
