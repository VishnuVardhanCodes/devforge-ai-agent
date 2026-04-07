import React from 'react';

const PreviewPanel = ({ result }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 mt-6 overflow-hidden transition-all hover:border-slate-600">
      <div className="bg-slate-900 border-b border-slate-700 p-3 px-4 flex items-center justify-between">
        <span className="text-slate-300 font-medium text-sm flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          Live Preview / API Status
        </span>
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs text-slate-400">localhost:3000</span>
        </div>
      </div>
      <div className="p-6">
        {result ? (
          <div className="bg-slate-900 rounded-lg p-6 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-slate-500">
            <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            <p>Generate a project to see live output</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
