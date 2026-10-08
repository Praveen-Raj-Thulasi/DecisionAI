import React from 'react';
import { Shield, Cpu, RefreshCw, FileText, Activity, AlertTriangle } from 'lucide-react';
import { AIStatus } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  aiStatus: AIStatus | null;
  onLoadDemo: () => void;
  hasDecision: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  aiStatus,
  onLoadDemo,
  hasDecision
}) => {
  return (
    <header className="border-b border-[var(--border-hairline)] bg-[#0b0f17]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('workspace')}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00e5ff]/20 to-[#38bdf8]/10 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-white tracking-tight">DecisionShield</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 uppercase font-semibold">
              Gemma 4 Audit
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Know if you're ready to decide.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="hidden md:flex items-center space-x-1 bg-[#111827] p-1 rounded-lg border border-[var(--border-hairline)]">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'workspace'
              ? 'bg-[#00e5ff] text-[#0b0f17] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Workspace
        </button>
        <button
          disabled={!hasDecision}
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
            !hasDecision ? 'opacity-40 cursor-not-allowed text-slate-500' :
            activeTab === 'dashboard'
              ? 'bg-[#00e5ff] text-[#0b0f17] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Dashboard
        </button>
        <button
          disabled={!hasDecision}
          onClick={() => setActiveTab('evidence')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
            !hasDecision ? 'opacity-40 cursor-not-allowed text-slate-500' :
            activeTab === 'evidence'
              ? 'bg-[#00e5ff] text-[#0b0f17] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Evidence Ledger
        </button>
        <button
          disabled={!hasDecision}
          onClick={() => setActiveTab('stress-test')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
            !hasDecision ? 'opacity-40 cursor-not-allowed text-slate-500' :
            activeTab === 'stress-test'
              ? 'bg-[#00e5ff] text-[#0b0f17] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Stress Simulator
        </button>
        <button
          disabled={!hasDecision}
          onClick={() => setActiveTab('report')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
            !hasDecision ? 'opacity-40 cursor-not-allowed text-slate-500' :
            activeTab === 'report'
              ? 'bg-[#00e5ff] text-[#0b0f17] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          Audit Report
        </button>
      </nav>

      {/* AI Provider & Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onLoadDemo}
          className="text-xs px-3 py-1.5 rounded-md bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-slate-200 transition-all flex items-center space-x-1.5 font-medium"
          title="Load pre-built PostgreSQL vs MongoDB demo audit"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>Load Demo Audit</span>
        </button>

        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111827] border border-[var(--border-hairline)] text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span className="text-slate-400">Provider:</span>
          <span className="text-[#00e5ff] font-semibold">{aiStatus?.active_provider || 'Gemma 4 (Ollama)'}</span>
        </div>
      </div>
    </header>
  );
};
