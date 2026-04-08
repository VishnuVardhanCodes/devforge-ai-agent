import React, { useState } from 'react';

const PromptBox = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt);
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 p-8 transition-all hover:border-white/10 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
           </div>
           <div>
              <h3 className="text-slate-200 font-black text-sm tracking-tight">Project Genesis</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Awaiting prompt input</p>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
           <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
           <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>

      <textarea
        className="w-full h-32 bg-slate-950/50 text-slate-200 rounded-xl p-5 focus:ring-2 focus:ring-blue-500/30 focus:outline-none border border-white/5 resize-none placeholder:text-slate-700 font-medium text-[15px] transition-all"
        placeholder="Describe the application architecture, tech stack, and core features..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <div className="flex gap-3 mt-6 justify-end">
        <button className="px-5 py-2.5 rounded-xl bg-slate-800/50 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all border border-white/5">
          Load Template
        </button>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:from-blue-50 hover:to-indigo-500 shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3 disabled:opacity-50 disabled:grayscale"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Engine...
            </>
          ) : (
            <>
              Generate Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="mt-8 flex flex-col gap-2">
           <div className="flex justify-between items-center px-1">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Pipeline Active</span>
              <span className="text-[9px] font-bold text-slate-600">ORCHESTRATING...</span>
           </div>
           <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-shimmer" style={{ width: '100%', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #3b82f6 100%)' }}></div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PromptBox;

