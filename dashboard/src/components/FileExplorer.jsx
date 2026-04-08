import React, { useState } from 'react';

const FileIcon = ({ name }) => {
  const isCode = name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.ts') || name.endsWith('.tsx');
  const isStyle = name.endsWith('.css') || name.endsWith('.scss');
  const isData = name.endsWith('.json') || name.endsWith('.yaml');
  const isConfig = name.includes('config') || name.startsWith('.');
  
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${
      isCode ? 'text-yellow-400' :
      isStyle ? 'text-pink-400' :
      isData ? 'text-orange-400' :
      isConfig ? 'text-slate-400' :
      'text-blue-400'
    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

const FolderIcon = ({ open }) => (
  <svg className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'} text-amber-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
      d={open
        ? "M19 9l-7 7-7-7"
        : "M19 9l-7 7-7-7"
      }
    />
  </svg>
);

const TreeNode = ({ node, depth = 0, onFileSelect, selectedFilePath }) => {
  const [open, setOpen] = useState(true);

  if (node.type === 'directory') {
    return (
      <div className="select-none">
        <div
          className="flex items-center gap-2 hover:bg-white/5 py-1 px-3 cursor-pointer text-slate-400 hover:text-slate-200 transition-all group"
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          onClick={() => setOpen(!open)}
        >
          <FolderIcon open={open} />
          <svg className="w-4 h-4 text-yellow-500 opacity-70 group-hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[13px] font-semibold">{node.name}</span>
        </div>
        {open && node.children?.map((child, i) => (
          <TreeNode 
            key={i} 
            node={child} 
            depth={depth + 1} 
            onFileSelect={onFileSelect} 
            selectedFilePath={selectedFilePath}
          />
        ))}
      </div>
    );
  }

  const isSelected = selectedFilePath === node.path;

  return (
    <div
      className={`flex items-center gap-2 py-1 px-3 cursor-pointer transition-all border-l-2 ${
        isSelected ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'hover:bg-white/5 border-transparent text-slate-400 hover:text-slate-200'
      }`}
      style={{ paddingLeft: `${depth * 12 + 12}px` }}
      onClick={() => onFileSelect(node)}
    >
      <div className="w-4 flex justify-center">
        <FileIcon name={node.name} />
      </div>
      <span className="text-[13px] font-medium">{node.name}</span>
    </div>
  );
};

const FileExplorer = ({ fileTree, onFileSelect, selectedFilePath, projectName }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 h-[32rem] flex flex-col overflow-hidden">
      <div className="bg-slate-900/60 border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
             <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
           </div>
           <span className="text-slate-200 font-bold text-[13px] tracking-tight">Explorer</span>
        </div>
        
        {projectName && (
          <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
            <span className="text-[9px] text-blue-400 uppercase font-black tracking-widest leading-none">
              {projectName}
            </span>
          </div>
        )}
      </div>

      <div className="overflow-y-auto custom-scrollbar flex-1 py-3 group/explorer">
        {fileTree.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-40">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
               </svg>
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Select project</p>
          </div>
        ) : (
          fileTree.map((node, i) => (
            <TreeNode 
              key={i} 
              node={node} 
              onFileSelect={onFileSelect} 
              selectedFilePath={selectedFilePath}
            />
          ))
        )}
      </div>
      
      <div className="p-3 border-t border-white/5 bg-slate-900/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>SRC: {projectName || 'root'}</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;

