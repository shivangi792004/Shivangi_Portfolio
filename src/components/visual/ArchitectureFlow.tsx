import React from 'react';
import { ArrowRight, ShieldCheck, Database, Server, Smartphone } from 'lucide-react';

interface ArchitectureFlowProps {
  client: string;
  api: string;
  auth: string;
  database: string;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  client,
  api,
  auth,
  database,
}) => {
  return (
    <div className="w-full my-6 p-4 sm:p-6 bg-surface-muted-light dark:bg-zinc-950/70 border border-border-light dark:border-border rounded-xl">
      <div className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 flex items-center justify-between">
        <span>Verified Architecture Pipeline</span>
        <span className="text-[11px] text-accent-500 font-semibold">MERN Flow</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative items-stretch">
        {/* Tier 1: Client */}
        <div className="p-3.5 rounded-lg border border-border-light dark:border-border bg-surface-light dark:bg-surface flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
            <Smartphone className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Client</span>
          </div>
          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            {client}
          </p>
        </div>

        {/* Tier 2: API Gateway */}
        <div className="p-3.5 rounded-lg border border-border-light dark:border-border bg-surface-light dark:bg-surface flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-sky-600 dark:text-sky-400">
            <Server className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">API Layer</span>
          </div>
          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            {api}
          </p>
        </div>

        {/* Tier 3: Middleware & Security */}
        <div className="p-3.5 rounded-lg border border-border-light dark:border-border bg-surface-light dark:bg-surface flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Auth Middleware</span>
          </div>
          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            {auth}
          </p>
        </div>

        {/* Tier 4: Database */}
        <div className="p-3.5 rounded-lg border border-border-light dark:border-border bg-surface-light dark:bg-surface flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
            <Database className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Database</span>
          </div>
          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            {database}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
        <span>Browser / React</span>
        <ArrowRight className="w-3 h-3 text-accent-500" />
        <span>Express REST</span>
        <ArrowRight className="w-3 h-3 text-accent-500" />
        <span>JWT Security</span>
        <ArrowRight className="w-3 h-3 text-accent-500" />
        <span>MongoDB Persistence</span>
      </div>
    </div>
  );
};

