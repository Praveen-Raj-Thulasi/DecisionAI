import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Activity,
  ArrowRight,
  TrendingDown,
  Layers,
  FileSearch
} from 'lucide-react';
import { DecisionDetail } from '../types';

interface DashboardProps {
  decision: DecisionDetail;
  onNavigateTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ decision, onNavigateTab }) => {
  const readiness = decision.readiness;
  const score = readiness?.score ?? 0;
  const status = readiness?.status ?? 'NOT_READY';

  // Status Styling
  const getStatusBadge = () => {
    switch (status) {
      case 'READY':
        return {
          label: 'DECISION READY',
          bg: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40',
          icon: <ShieldCheck className="w-4 h-4 text-[#10b981]" />,
          color: '#10b981'
        };
      case 'CAUTION':
        return {
          label: 'CAUTION: INFORMATION GAPS',
          bg: 'bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/40',
          icon: <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />,
          color: '#f59e0b'
        };
      default:
        return {
          label: 'NOT READY TO DECIDE',
          bg: 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/40',
          icon: <ShieldAlert className="w-4 h-4 text-[#ef4444]" />,
          color: '#ef4444'
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-6 border-[var(--border-hairline)] bg-gradient-to-r from-[#111827] via-[#0b0f17] to-[#111827]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center space-x-1.5 ${statusBadge.bg}`}>
                {statusBadge.icon}
                <span>{statusBadge.label}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">ID: {decision.decision_id}</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{decision.title}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Options: {decision.options.join('  •  ')}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigateTab('stress-test')}
              className="px-4 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <Activity className="w-4 h-4 text-[#00e5ff]" />
              <span>Simulate Stress Test</span>
            </button>
            <button
              onClick={() => onNavigateTab('report')}
              className="px-4 py-2 rounded-lg bg-[#00e5ff] hover:bg-[#38bdf8] text-[#0b0f17] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center space-x-1.5"
            >
              <span>View Audit Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Score & Dimension Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Gauge Meter Card */}
        <div className="glass-card p-6 border-[#00e5ff]/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Decision Readiness Score
          </div>

          {/* SVG Concentric Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Dynamic Value Stroke */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={statusBadge.color}
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-mono text-white tracking-tight">{score}%</span>
              <span className="text-[10px] font-mono uppercase text-slate-400 mt-0.5">Readiness</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
            {score < 60
              ? 'Critical evidence gaps and high assumption risks detected. Do not commit until missing evidence is verified.'
              : score < 80
              ? 'Moderate evidence coverage. Resolve key unverified claims before proceeding.'
              : 'Decision foundation is well supported by verified facts.'}
          </p>
        </div>

        {/* 6 Metric Dimensions Grid */}
        <div className="lg:col-span-2 glass-card p-6 border-[var(--border-hairline)] space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Readiness Dimensions Breakdown</span>
            <span className="text-[11px] font-mono text-[#00e5ff]">Deterministic Model</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Evidence Quality</span>
                <span className="font-mono text-[#00e5ff] font-semibold">{readiness?.evidence_quality ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00e5ff]" style={{ width: `${readiness?.evidence_quality ?? 0}%` }}></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Requirement Coverage</span>
                <span className="font-mono text-[#38bdf8] font-semibold">{readiness?.requirement_coverage ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#38bdf8]" style={{ width: `${readiness?.requirement_coverage ?? 0}%` }}></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Risk Coverage</span>
                <span className="font-mono text-[#10b981] font-semibold">{readiness?.risk_coverage ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#10b981]" style={{ width: `${readiness?.risk_coverage ?? 0}%` }}></div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Assumption Load Penalty</span>
                <span className="font-mono text-[#f59e0b] font-semibold">{readiness?.assumption_load ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#f59e0b]" style={{ width: `${readiness?.assumption_load ?? 0}%` }}></div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Unknown Info Penalty</span>
                <span className="font-mono text-[#ef4444] font-semibold">{readiness?.unknowns ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#ef4444]" style={{ width: `${readiness?.unknowns ?? 0}%` }}></div>
              </div>
            </div>

            {/* Metric 6 */}
            <div className="p-3.5 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300 font-medium">Decision Stability Index</span>
                <span className="font-mono text-[#00e5ff] font-semibold">{readiness?.decision_stability ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#00e5ff]" style={{ width: `${readiness?.decision_stability ?? 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Analysis Summary */}
      <div className="glass-card p-6 border-[var(--border-hairline)] space-y-4">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
          <FileSearch className="w-4 h-4 text-[#00e5ff]" />
          <span>Gemma 4 Evidence Synthesis</span>
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed bg-[#0b0f17]/60 p-4 rounded-lg border border-[var(--border-hairline)]">
          {decision.summary}
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Facts count */}
          <div className="p-4 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Verified Facts</span>
              <div className="text-xl font-bold font-mono text-white mt-0.5">{decision.facts.length}</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          {/* High risk assumptions */}
          <div className="p-4 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Unverified Assumptions</span>
              <div className="text-xl font-bold font-mono text-[#f59e0b] mt-0.5">{decision.assumptions.length}</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Critical missing evidence */}
          <div className="p-4 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Missing Critical Evidence</span>
              <div className="text-xl font-bold font-mono text-[#ef4444] mt-0.5">{decision.missing_evidence.length}</div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#ef4444]/10 text-[#ef4444] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Missing Evidence Action Panel */}
      <div className="glass-card p-6 border-[#ef4444]/30 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#ef4444]" />
            <span>High-Impact Missing Evidence Required Before Commitment</span>
          </h3>
          <button
            onClick={() => onNavigateTab('evidence')}
            className="text-xs text-[#00e5ff] hover:underline font-semibold flex items-center space-x-1"
          >
            <span>Explore All Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {decision.missing_evidence.map((item) => (
            <div key={item.id} className="p-4 rounded-lg bg-[#0b0f17] border border-[#ef4444]/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30">
                    {item.importance}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-300 mt-1">{item.reason}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-[#00e5ff] block font-medium">Recommended Verification Action:</span>
                <span className="text-xs text-slate-200">{item.verification_action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
