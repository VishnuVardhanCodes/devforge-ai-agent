import React, { useEffect, useRef } from 'react';

const Terminal = ({ logs }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogDetails = (log) => {
    if (log.includes('✅') || log.includes('🏁') || log.includes('success')) {
      return { color: 'text-emerald-400', icon: 'check', bg: 'bg-emerald-500/10', tag: 'Success' };
    }
    if (log.includes('❌') || log.includes('Error') || log.includes('Err')) {
      return { color: 'text-rose-400', icon: 'error', bg: 'bg-rose-500/10', tag: 'Error' };
    }
    if (log.includes('▶') || log.includes('Starting') || log.includes('⚡')) {
      return { color: 'text-blue-400', icon: 'play', bg: 'bg-blue-500/10', tag: 'Execute' };
    }
    if (log.includes('🚀') || log.includes('Running') || log.includes('http')) {
      return { color: 'text-indigo-400', icon: 'rocket', bg: 'bg-indigo-500/10', tag: 'Deploy' };
    }
    if (log.includes('Analyzing') || log.includes('Thinking') || log.includes('Designing')) {
      return { color: 'text-amber-400', icon: 'brain', bg: 'bg-amber-500/10', tag: 'Think' };
    }
    return { color: 'text-slate-300', icon: 'info', bg: 'bg-slate-800/40', tag: 'Log' };
  };

  const LogIcon = ({ type }) => {
    switch (type) {
      case 'check': return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>;
      case 'error': return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>;
      case 'play': return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13L16 10 4.5 3.5z"/></svg>;
      case 'rocket': return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
      case 'brain': return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
      default: return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 h-64 flex flex-col overflow-hidden">
      <div className="bg-slate-900/60 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] border-l border-white/10 pl-3">Agent Activity Feed</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded font-black border border-blue-500/20">LIVE</span>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 space-y-3 custom-scrollbar bg-slate-950/20">
        <div className="flex items-start gap-3 opacity-30">
          <div className="mt-1 w-5 h-5 rounded bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-500 italic">DF</div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">System Initialize</p>
            <p className="text-[13px] text-slate-600 font-medium">DevForge Engine v2.0.4 active. Authentication successful.</p>
          </div>
        </div>

        {logs.map((log, index) => {
          const details = getLogDetails(log);
          return (
            <div key={index} className="flex items-start gap-4 group animate-in slide-in-from-left-2 duration-300">
              <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded flex items-center justify-center ${details.bg} ${details.color} border border-white/5 shadow-sm`}>
                <LogIcon type={details.icon} />
              </div>
              <div className="flex-1 border-b border-white/5 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${details.color}`}>
                    {details.tag}
                  </span>
                  <span className="text-[9px] font-mono text-slate-700">T+{index}s</span>
                </div>
                <div className={`text-[14px] font-medium leading-relaxed ${details.color.replace('track', '')} opacity-90 group-hover:opacity-100 transition-opacity`}>
                   {log.replace(/^[✅🏁❌🚀▶⚡∟\s]+/, '').trim()}
                </div>
              </div>
            </div>
          );
        })}
        
        <div ref={bottomRef} className="pt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Awaiting interaction...</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

