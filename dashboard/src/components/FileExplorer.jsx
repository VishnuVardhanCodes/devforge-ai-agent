import React, { useState } from 'react';

const FileIcon = () => (
  <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FolderIcon = ({ open }) => (
  <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d={open
        ? "M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
        : "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      }
    />
  </svg>
);

const getFileColor = (name) => {
  if (name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.ts') || name.endsWith('.tsx')) return 'text-yellow-300';
  if (name.endsWith('.json')) return 'text-orange-300';
  if (name.endsWith('.md')) return 'text-blue-300';
  if (name.endsWith('.css')) return 'text-pink-300';
  if (name.endsWith('.env') || name.endsWith('.env.example')) return 'text-green-300';
  return 'text-slate-300';
};

const TreeNode = ({ node, depth = 0, onFileSelect, selectedFilePath }) => {
  const [open, setOpen] = useState(true);

  if (node.type === 'directory') {
    return (
      <div>
        <div
          className="flex items-center gap-1.5 hover:bg-slate-700/50 px-2 py-1 rounded cursor-pointer text-slate-200 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setOpen(!open)}
        >
          <FolderIcon open={open} />
          <span className="text-sm font-medium">{node.name}</span>
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
      className={`flex items-center gap-1.5 group px-2 py-1 rounded cursor-pointer transition-all ${
        isSelected ? 'bg-blue-600/30 text-blue-300' : 'hover:bg-slate-700/50 ' + getFileColor(node.name)
      }`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={() => onFileSelect(node)}
    >
      <FileIcon />
      <span className="text-sm">{node.name}</span>
    </div>
  );
};

const FileExplorer = ({ fileTree, onFileSelect, selectedFilePath, projectName }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl shadow-xl border border-slate-700 h-[32rem] flex flex-col overflow-hidden">
      <div className="bg-slate-800/80 border-b border-slate-700 p-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-slate-300 font-semibold text-sm">Explorer</span>
           {projectName && (
             <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase font-bold">
               {projectName}
             </span>
           )}
        </div>
        <span className="text-slate-500 text-[10px] font-mono">devforge-demo/</span>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-1 py-2">
        {fileTree.length === 0 ? (
          <div className="text-slate-500 text-sm text-center mt-12 px-4">
            <div className="text-3xl mb-2 opacity-30">📂</div>
            <p>Select a project to view files</p>
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
    </div>
  );
};

export default FileExplorer;
