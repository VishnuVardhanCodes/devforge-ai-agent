import React from 'react';

const FileExplorer = () => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-96 flex flex-col overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-700 p-3 px-4 flex items-center justify-between">
        <span className="text-slate-300 font-medium text-sm">File Explorer</span>
      </div>
      <div className="p-4 overflow-y-auto text-sm text-slate-400 font-mono flex-1">
        <div className="flex items-center gap-2 mb-2 text-slate-300">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          demo-output/
        </div>
        
        <div className="ml-6 border-l border-slate-700 pl-4 py-1">
          <div className="flex items-center gap-2 mb-2 text-slate-300 hover:text-green-400 cursor-pointer">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            node-api/
          </div>
          <div className="ml-6 border-l border-slate-700 pl-4 py-1 space-y-2">
            <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              package.json
            </div>
            <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              README.md
            </div>
            <div className="text-slate-300 flex items-center gap-2 mt-1">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              src/
            </div>
            <div className="ml-6 border-l border-slate-700 pl-4 py-1 space-y-2">
              <div className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <span className="w-3.5 h-3.5 flex items-center justify-center text-yellow-400 text-xs font-bold">JS</span>
                index.js
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-slate-300 hover:text-green-400 cursor-pointer">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            react-app/
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
