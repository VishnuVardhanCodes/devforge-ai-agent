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

const TreeNode = ({ node, depth = 0 }) => {
  const [open, setOpen] = useState(true);

  if (node.type === 'directory') {
    return (
      <div>
        <div
          className="flex items-center gap-1.5 hover:bg-slate-700 px-2 py-1 rounded cursor-pointer text-slate-200"
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          onClick={() => setOpen(!open)}
        >
          <FolderIcon open={open} />
          <span className="text-sm font-medium">{node.name}/</span>
        </div>
        {open && node.children?.map((child, i) => (
          <TreeNode key={i} node={child} depth={depth + 1} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1.5 hover:bg-slate-700 px-2 py-1 rounded cursor-pointer ${getFileColor(node.name)}`}
      style={{ paddingLeft: `${depth * 14 + 8}px` }}
    >
      <FileIcon />
      <span className="text-sm">{node.name}</span>
    </div>
  );
};

const FileExplorer = ({ fileTree }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 h-96 flex flex-col overflow-hidden">
      <div className="bg-slate-900 border-b border-slate-700 p-3 px-4 flex items-center justify-between">
        <span className="text-slate-300 font-medium text-sm">📁 Generated Files</span>
        <span className="text-slate-500 text-xs">demo-output/</span>
      </div>
      <div className="overflow-y-auto flex-1 py-2">
        {fileTree.length === 0 ? (
          <div className="text-slate-500 text-sm text-center mt-12 px-4">
            <div className="text-3xl mb-2">⏳</div>
            <p>No files generated yet.</p>
            <p className="text-xs mt-1">Run a prompt to generate your project.</p>
          </div>
        ) : (
          fileTree.map((node, i) => <TreeNode key={i} node={node} />)
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
