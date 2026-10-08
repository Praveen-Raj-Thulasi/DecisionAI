import React from 'react';
import { Shield, Printer, Download, CheckCircle, AlertTriangle, ShieldAlert, FileText, CheckSquare } from 'lucide-react';
import { DecisionDetail } from '../types';

interface AuditReportProps {
  decision: DecisionDetail;
}

export const AuditReport: React.FC<AuditReportProps> = ({ decision }) => {
  const readiness = decision.readiness;
  const score = readiness?.score ?? 0;
  const status = readiness?.status ?? 'NOT_READY';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Final Decision Audit Report</h1>
          <p className="text-xs text-slate-400 mt-1">Official Decision Readiness Audit Record</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <Printer className="w-4 h-4 text-[#00e5ff]" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="glass-card p-8 border-[#00e5ff]/30 bg-[#0b0f17] space-y-8 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Document Header */}
        <div className="border-b border-[var(--border-hairline)] pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-6 h-6 text-[#00e5ff]" />
              <span className="font-bold text-lg text-white font-mono uppercase tracking-tight">DECISIONSHIELD AUDIT REPORT</span>
            </div>
            <h2 className="text-xl font-bold text-white">{decision.title}</h2>
            <p className="text-xs text-slate-400 mt-1">Audit Record ID: {decision.decision_id}  •  Provider: {decision.provider_used}</p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-mono font-bold text-[#00e5ff]">{score}%</div>
            <div className={`mt-1 text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded border inline-block ${
              status === 'READY' ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40' :
              status === 'CAUTION' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40' :
              'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40'
            }`}>
              STATUS: {status.replace('_', ' ')}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-[#00e5ff] font-bold">1. Executive Summary</h3>
          <p className="text-sm text-slate-200 leading-relaxed bg-[#111827] p-4 rounded-lg border border-[var(--border-hairline)]">
            {decision.summary}
          </p>
        </div>

        {/* Options Considered */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase text-[#00e5ff] font-bold">2. Candidate Options Evaluated</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {decision.options.map((opt, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#111827] border border-[var(--border-hairline)] text-xs text-white flex items-center space-x-2">
                <span className="w-5 font-mono text-[#00e5ff] font-bold">0{i + 1}.</span>
                <span>{opt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classified Evidence Ledger Summary */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase text-[#00e5ff] font-bold">3. Evidence Classification Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facts */}
            <div className="p-4 rounded-lg bg-[#111827] border border-[var(--border-hairline)] space-y-2">
              <span className="text-xs font-bold text-[#10b981] flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Verified Facts ({decision.facts.length})</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {decision.facts.map((f) => (
                  <li key={f.id}>• {f.statement}</li>
                ))}
              </ul>
            </div>

            {/* Assumptions */}
            <div className="p-4 rounded-lg bg-[#111827] border border-[var(--border-hairline)] space-y-2">
              <span className="text-xs font-bold text-[#f59e0b] flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Unverified Assumptions ({decision.assumptions.length})</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {decision.assumptions.map((a) => (
                  <li key={a.id}>• {a.statement} <span className="text-[10px] text-[#f59e0b]">[{a.risk_level} RISK]</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Missing Evidence & Critical Action Items */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase text-[#ef4444] font-bold">4. High-Impact Missing Evidence & Action Plan</h3>
          <div className="space-y-2">
            {decision.missing_evidence.map((m) => (
              <div key={m.id} className="p-4 rounded-lg bg-[#111827] border border-[#ef4444]/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{m.title}</span>
                  <span className="text-[#ef4444] font-mono">{m.importance}</span>
                </div>
                <p className="text-xs text-slate-300">{m.reason}</p>
                <div className="text-xs text-[#00e5ff] font-mono pt-1">
                  Required Action: {m.verification_action}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signoff Disclaimer */}
        <div className="pt-6 border-t border-[var(--border-hairline)] text-[11px] text-slate-500 font-mono text-center">
          DecisionShield Audit System  •  Google Gemma 4 Reasoning Layer  •  Non-Hallucinated Deterministic Score
        </div>
      </div>
    </div>
  );
};
