import React, { useState, useEffect } from 'react';

const Terminal = ({ logs }) => {
  return (
    <div className="bg-black rounded-xl shadow-lg border border-slate-700 h-96 flex flex-col overflow-hidden font-mono text-sm">
      <div className="bg-slate-900 border-b border-slate-700 p-3 px-4 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-slate-400 text-xs ml-2">gitclaw output</span>
      </div>
      <div className="p-4 overflow-y-auto flex-1 text-green-400 leading-relaxed">
        <div className="opacity-80">
          DevForge v0.2.0 initialized.
          <br />Waiting for command...
        </div>
        {logs.map((log, index) => (
          <div key={index} className="mt-1 animate-fade-in">{log}</div>
        ))}
        <div className="mt-2 text-slate-500">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
