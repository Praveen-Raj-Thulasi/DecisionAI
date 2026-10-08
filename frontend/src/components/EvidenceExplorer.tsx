import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, FileCheck, ShieldAlert, ListChecks } from 'lucide-react';
import { DecisionDetail } from '../types';

interface EvidenceExplorerProps {
  decision: DecisionDetail;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ decision }) => {
  const [activeSubTab, setActiveSubTab] = useState<'facts' | 'assumptions' | 'unknowns' | 'claims' | 'actions'>('facts');
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Evidence Ledger & Classification</h1>
          <p className="text-xs text-slate-400 mt-1">
            Gemma 4 parsed evidence categorized into Verified Facts, Unverified Assumptions, Claims, and Unknown Gaps.
          </p>
        </div>

        {/* Subtab Selector */}
        <div className="flex items-center space-x-1 bg-[#111827] p-1 rounded-lg border border-[var(--border-hairline)] self-start">
          <button
            onClick={() => setActiveSubTab('facts')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeSubTab === 'facts' ? 'bg-[#10b981] text-[#0b0f17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Facts ({decision.facts.length})
          </button>
          <button
            onClick={() => setActiveSubTab('assumptions')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeSubTab === 'assumptions' ? 'bg-[#f59e0b] text-[#0b0f17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Assumptions ({decision.assumptions.length})
          </button>
          <button
            onClick={() => setActiveSubTab('unknowns')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeSubTab === 'unknowns' ? 'bg-[#ef4444] text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Unknowns ({decision.unknowns.length})
          </button>
          <button
            onClick={() => setActiveSubTab('claims')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeSubTab === 'claims' ? 'bg-[#00e5ff] text-[#0b0f17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Claims ({decision.claims.length})
          </button>
          <button
            onClick={() => setActiveSubTab('actions')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeSubTab === 'actions' ? 'bg-[#38bdf8] text-[#0b0f17]' : 'text-slate-300 hover:text-white'
            }`}
          >
            Checklist ({decision.verification_actions.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {/* FACTS TAB */}
        {activeSubTab === 'facts' && (
          <div className="space-y-3">
            {decision.facts.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-400 text-xs">No explicit verified facts parsed from context.</div>
            ) : (
              decision.facts.map((fact) => (
                <div key={fact.id} className="glass-card p-4 border-[#10b981]/30 flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#10b981] font-bold uppercase">VERIFIED FACT</span>
                      <span className="text-[11px] font-mono text-slate-400">Confidence: {(fact.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">{fact.statement}</p>
                    <span className="text-[11px] text-slate-500 mt-1 block">Source: {fact.source || 'User Entry'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ASSUMPTIONS TAB */}
        {activeSubTab === 'assumptions' && (
          <div className="space-y-3">
            {decision.assumptions.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-400 text-xs">No unverified assumptions parsed.</div>
            ) : (
              decision.assumptions.map((ass) => (
                <div key={ass.id} className="glass-card p-4 border-[#f59e0b]/30 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#f59e0b] font-bold uppercase">UNVERIFIED ASSUMPTION</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
                        RISK: {ass.risk_level}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">{ass.statement}</p>
                    <p className="text-xs text-slate-400 mt-1">Operational Impact: {ass.impact}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* UNKNOWNS TAB */}
        {activeSubTab === 'unknowns' && (
          <div className="space-y-3">
            {decision.unknowns.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-400 text-xs">No unknown variables flagged.</div>
            ) : (
              decision.unknowns.map((unk) => (
                <div key={unk.id} className="glass-card p-4 border-[#ef4444]/30 flex items-start space-x-3">
                  <ShieldAlert className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#ef4444] font-bold uppercase">CRITICAL UNKNOWN GAP</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30">
                        CRITICALITY: {unk.criticality}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">{unk.statement}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CLAIMS TAB */}
        {activeSubTab === 'claims' && (
          <div className="space-y-3">
            {decision.claims.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-400 text-xs">No unverified claims extracted.</div>
            ) : (
              decision.claims.map((claim) => (
                <div key={claim.id} className="glass-card p-4 border-[#00e5ff]/30 flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#00e5ff] font-bold uppercase">CLAIM REQUIRING VERIFICATION</span>
                      <span className="text-[11px] font-mono text-slate-400">Status: {claim.verified ? 'Verified' : 'Unverified'}</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">{claim.statement}</p>
                    <p className="text-xs text-slate-300 mt-1">Evidence Required: {claim.evidence_required}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CHECKLIST TAB */}
        {activeSubTab === 'actions' && (
          <div className="glass-card p-6 border-[var(--border-hairline)] space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <ListChecks className="w-4 h-4 text-[#38bdf8]" />
              <span>Prioritized Verification Action Plan</span>
            </h3>

            <div className="space-y-3">
              {decision.verification_actions.map((act) => {
                const isChecked = !!completedActions[act.id];
                return (
                  <div
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-[#10b981]/10 border-[#10b981]/40 line-through text-slate-400'
                        : 'bg-[#0b0f17] border-[var(--border-hairline)] hover:border-[#38bdf8]/50 text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded accent-[#00e5ff]"
                      />
                      <div>
                        <div className="text-sm font-bold">{act.title}</div>
                        <div className="text-xs text-slate-400">Target: {act.target_item}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1e293b] text-[#38bdf8] border border-slate-700">
                      Priority: {act.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
