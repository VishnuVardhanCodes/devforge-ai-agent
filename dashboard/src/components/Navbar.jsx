import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">DevForge AI Agent</h1>
        <p className="text-sm text-slate-400 mt-1">Autonomous Software Engineer</p>
      </div>
      <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-green-400 font-medium">Active</span>
      </div>
    </nav>
  );
};

export default Navbar;
