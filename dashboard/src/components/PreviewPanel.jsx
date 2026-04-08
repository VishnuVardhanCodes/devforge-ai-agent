import React, { useState } from 'react';

const PreviewPanel = ({ 
  selectedProject, 
  runningProjectUrl, 
  onRunProject, 
  onStopProject, 
  fileContent,
  isStarting
}) => {
  const isRunning = !!runningProjectUrl;
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'code'

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 overflow-hidden transition-all flex flex-col h-[32rem]">
      {/* ... header ... */}
      <div className="bg-slate-900/60 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : isStarting ? 'bg-blue-500 animate-bounce' : 'bg-slate-700 shadow-inner'}`}></div>
            <span className="text-slate-200 font-bold text-[13px] tracking-tight">
              {isRunning ? 'Live Preview' : isStarting ? 'Initializing Engine' : 'Preview Panel'}
            </span>
          </div>
          {/* ... */}
        </div>
        {/* ... */}
      </div>

      <div className="flex-1 bg-slate-950 overflow-hidden relative">
        {fileContent ? (
          /* ... code view ... */
          <div className="h-full flex flex-col bg-[#0d1117]">
            <div className="bg-slate-900 px-5 py-2.5 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-[11px] font-bold font-mono text-slate-400 tracking-tight">{fileContent.path}</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                <span>UTF-8</span>
                <span>Ln 1, Col 1</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 custom-scrollbar">
              <pre className="text-[13px] font-mono leading-relaxed">
                <code className="text-slate-300">{fileContent.content}</code>
              </pre>
            </div>
          </div>
        ) : isRunning ? (
          <div className="w-full h-full bg-white relative">
            <iframe 
              src={runningProjectUrl} 
              className="w-full h-full border-none shadow-inner"
              title="Preview"
            />
          </div>
        ) : isStarting ? (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="relative mb-8">
               <div className="w-24 h-24 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                  <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
            </div>
            <h3 className="text-slate-200 font-black text-xl mb-3 tracking-tight">Initializing Application...</h3>
            <p className="text-slate-500 text-[13px] max-w-sm font-medium leading-relaxed">
              DevForge is orchestrating the development environment and launching your software factory.
            </p>
            <div className="mt-8 flex gap-1 justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
            </div>
          </div>
        ) : (
          /* ... idle screen ... */
          <div className="h-full flex flex-col items-center justify-center p-12 text-center group">
            <div className="relative mb-8">
               <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-2xl shadow-blue-500/10">
                  <svg className="w-12 h-12 text-slate-700 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
               </div>
               <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-4 border-slate-950 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.5 3.5v13L16 10 4.5 3.5z"/>
                  </svg>
               </div>
            </div>
            <h3 className="text-slate-200 font-black text-xl mb-3 tracking-tight">Project Ready for Launch</h3>
            <p className="text-slate-500 text-[13px] max-w-sm font-medium leading-relaxed mb-8">
              Select a project and click <strong>Run Project</strong> to initialize the development server and see your application live.
            </p>
            
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="bg-slate-900/50 border border-white/5 p-3 rounded-xl">
                 <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Status</p>
                 <p className="text-[11px] font-bold text-slate-400">Idle</p>
              </div>
              <div className="bg-slate-900/50 border border-white/5 p-3 rounded-xl">
                 <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Node Engine</p>
                 <p className="text-[11px] font-bold text-slate-400">v18.x</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer / Status Bar Overlay */}
      <div className="bg-slate-900/80 border-t border-white/5 h-8 flex items-center justify-between px-4 z-10 backdrop-blur-md">
        <div className="flex items-center gap-4 text-[9px] font-black tracking-widest uppercase text-slate-600">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <span>Vite Server</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
             <span>HMR Enabled</span>
          </div>
        </div>
        <div className="text-[9px] font-mono text-slate-600">
          AGENT_ENV: PROD
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;

