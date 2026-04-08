import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ logs }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLineColor = (log) => {
    if (log.includes('✅') || log.includes('🏁') || log.includes('[Success]')) return 'text-green-400';
    if (log.includes('❌') || log.includes('Error') || log.includes('✗')) return 'text-red-400';
    if (log.includes('▶') || log.includes('[1/') || log.includes('[4/')) return 'text-cyan-400';
    if (log.includes('∟') || log.includes('Created:')) return 'text-yellow-300';
    if (log.includes('🚀')) return 'text-purple-400';
    return 'text-green-300';
  };

  return (
    <div className="bg-black rounded-xl shadow-lg border border-slate-700 h-96 flex flex-col overflow-hidden font-mono text-sm">
      <div className="bg-slate-900 border-b border-slate-700 p-3 px-4 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-slate-400 text-xs ml-2">gitclaw output — DevForge v0.2.0</span>
      </div>
      <div className="p-4 overflow-y-auto flex-1 leading-relaxed space-y-0.5">
        <div className="text-slate-500 mb-3">
          DevForge v0.2.0 initialized.<br />Waiting for command...
        </div>
        {logs.map((log, index) => (
          <div key={index} className={`${getLineColor(log)} transition-all duration-150`}>
            {log}
          </div>
        ))}
        <div ref={bottomRef} className="mt-2 text-slate-500">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
