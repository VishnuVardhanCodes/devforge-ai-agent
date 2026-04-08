import React from 'react';

const ProjectSidebar = ({ projects, selectedProject, onSelectProject, onNewProject }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="p-5 border-b border-white/5 bg-slate-900/60 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Workspace</h2>
          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold border border-white/5">
            {projects.length} PROJECTS
          </span>
        </div>
        <p className="text-xs font-bold text-slate-300">Generated Projects</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 opacity-20">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">No projects found</p>
          </div>
        ) : (
          projects.map((project) => (
            <button
              key={project.name}
              onClick={() => onSelectProject(project)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                selectedProject?.name === project.name
                  ? 'bg-blue-600/10 border-blue-500/30'
                  : 'bg-slate-800/20 border-white/5 hover:bg-slate-800/40 hover:border-white/10'
              }`}
            >
              {/* Active Indicator Glow */}
              {selectedProject?.name === project.name && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              )}

              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex flex-col">
                  <span className={`text-[13px] font-bold tracking-tight transition-colors ${
                    selectedProject?.name === project.name ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {project.name}
                  </span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter border ${
                  project.type === 'react' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                  project.type === 'node' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  'bg-slate-500/10 text-slate-400 border-slate-500/20'
                }`}>
                  {project.type}
                </span>
              </div>

              <div className="flex items-center justify-between relative z-10">
                 <div className="flex flex-col gap-0.5">
                   <div className="text-[9px] text-slate-500 font-bold uppercase flex items-center gap-1">
                     <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     {new Date(project.created).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                   </div>
                 </div>
                 
                 {selectedProject?.name === project.name && (
                   <div className="flex items-center gap-1.5">
                     <span className="text-[8px] font-black text-blue-500/60 uppercase">Selected</span>
                     <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping"></div>
                   </div>
                 )}
              </div>

              {/* Decorative technical detail */}
              <div className="absolute -bottom-1 -right-1 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </button>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-white/5 bg-slate-900/40">
        <button 
          onClick={onNewProject}
          className="w-full py-2.5 rounded-lg border border-white/5 bg-slate-800/40 text-[11px] font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>
    </div>
  );
};

export default ProjectSidebar;

