import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-opacity-80">
      <div className="flex-1 hidden md:flex">
        <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-1.5 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">System Ready</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            DevForge <span className="text-blue-500">AI</span>
          </h1>
        </div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] ml-10">Autonomous Software Engineer</p>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-4">
          <div className="h-8 w-px bg-white/5"></div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Antigravity V2</p>
               <p className="text-[9px] text-slate-600">Pro Edition</p>
             </div>
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-slate-400 shadow-inner">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

