import React, { useState } from 'react';

const PromptBox = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim() || loading) return;
    onGenerate(prompt);
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6 mb-6 transition-all hover:border-slate-600">
      <textarea
        className="w-full h-32 bg-slate-900 text-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:outline-none border border-slate-700 resize-none"
        placeholder="Describe the project you want DevForge to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <div className="flex gap-4 mt-4 justify-end">
        <button className="px-6 py-2.5 rounded-lg bg-slate-700 text-slate-300 font-medium hover:bg-slate-600 transition-colors">
          Debug Project
        </button>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/20 transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Project'
          )}
        </button>
      </div>

      {loading && (
        <div className="mt-4 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-pulse transition-all duration-1000 ease-in-out" style={{ width: '100%' }}></div>
        </div>
      )}
    </div>
  );
};

export default PromptBox;
