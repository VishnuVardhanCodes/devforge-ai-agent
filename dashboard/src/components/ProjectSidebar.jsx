import React from 'react';

const ProjectSidebar = ({ projects, selectedProject, onSelectProject }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden flex flex-col h-full shadow-xl">
      <div className="p-4 border-b border-slate-700 bg-slate-800/80">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Generated Projects</h2>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {projects.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm">
            No projects generated yet.
          </div>
        ) : (
          projects.map((project) => (
            <button
              key={project.name}
              onClick={() => onSelectProject(project)}
              className={`w-full text-left p-4 border-b border-slate-700/50 transition-all duration-200 group relative ${
                selectedProject?.name === project.name
                  ? 'bg-blue-600/20 border-l-4 border-l-blue-500'
                  : 'hover:bg-slate-700/30 border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-medium text-sm truncate ${
                  selectedProject?.name === project.name ? 'text-blue-400' : 'text-slate-200'
                }`}>
                  {project.name}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                  project.type === 'react' ? 'bg-cyan-500/20 text-cyan-400' :
                  project.type === 'node' ? 'bg-green-500/20 text-green-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {project.type}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                 <span>{new Date(project.created).toLocaleDateString()}</span>
                 <span>•</span>
                 <span>{new Date(project.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              {selectedProject?.name === project.name && (
                <div className="absolute right-2 bottom-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
