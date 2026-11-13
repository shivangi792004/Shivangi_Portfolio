import React from 'react';

export const CodeEditorPreview: React.FC = () => {
  return (
    <div className="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-400/80 dark:bg-green-500/60" />
        </div>
        <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
          ShivangiSingh.tsx
        </div>
        <div className="w-16 text-right text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">TypeScript</div>
      </div>

      {/* Editor Content with Line Numbers */}
      <div className="p-4 sm:p-5 flex gap-4 leading-relaxed overflow-x-auto text-zinc-700 dark:text-zinc-300">
        {/* Line Numbers Column (Decorative) */}
        <div aria-hidden="true" className="select-none text-zinc-400 dark:text-zinc-400 text-right font-mono text-xs space-y-1.5 pr-2 border-r border-zinc-100 dark:border-zinc-800/60">
          <div>01</div>
          <div>02</div>
          <div>03</div>
          <div>04</div>
          <div>05</div>
          <div>06</div>
          <div>07</div>
          <div>08</div>
          <div>09</div>
          <div>10</div>
          <div>11</div>
        </div>

        {/* Code Body */}
        <div className="space-y-1.5 flex-1">
          <div className="text-zinc-500 dark:text-zinc-400 italic">
            // Building digital experiences through clean code
          </div>
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              interface
            </span>{' '}
            <span className="text-teal-600 dark:text-teal-300 font-semibold">
              Engineer
            </span>{' '}
            &#123;
          </div>
          <div className="pl-4">
            <span className="text-zinc-600 dark:text-zinc-400">name:</span>{' '}
            <span className="text-emerald-600 dark:text-emerald-400">'Shivangi Singh'</span>;
          </div>
          <div className="pl-4">
            <span className="text-zinc-600 dark:text-zinc-400">role:</span>{' '}
            <span className="text-emerald-600 dark:text-emerald-400">'Frontend Developer'</span>;
          </div>
          <div className="pl-4">
            <span className="text-zinc-600 dark:text-zinc-400">current:</span>{' '}
            <span className="text-emerald-600 dark:text-emerald-400">'Triwize Journey Pvt. Ltd.'</span>;
          </div>
          <div className="pl-4">
            <span className="text-zinc-600 dark:text-zinc-400">stack:</span> [
            <span className="text-emerald-600 dark:text-emerald-400">'React.js'</span>,{' '}
            <span className="text-emerald-600 dark:text-emerald-400">'Tailwind'</span>,{' '}
            <span className="text-emerald-600 dark:text-emerald-400">'MERN'</span>];
          </div>
          <div className="pl-4">
            <span className="text-zinc-600 dark:text-zinc-400">openToRoles:</span>{' '}
            <span className="text-amber-600 dark:text-amber-400">true</span>;
          </div>
          <div>&#125;</div>
          <div className="pt-1">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              const
            </span>{' '}
            <span className="text-sky-600 dark:text-sky-300">coreFocus</span> = () =&gt; (
          </div>
          <div className="pl-4 text-zinc-600 dark:text-zinc-400">
            'Authentic craft, responsive design &amp; robust architecture'
          </div>
          <div>);</div>
        </div>
      </div>
    </div>
  );
};
