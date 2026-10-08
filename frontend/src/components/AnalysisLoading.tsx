import React, { useEffect, useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';

interface AnalysisLoadingProps {
  decisionTitle: string;
  onComplete: () => void;
}

const STEPS = [
  { id: 1, label: 'Understanding decision context & candidate options' },
  { id: 2, label: 'Semantic evidence extraction (Facts vs. Assumptions)' },
  { id: 3, label: 'Identifying unverified claims & missing evidence gaps' },
  { id: 4, label: 'Running deterministic readiness engine & penalty scoring' },
  { id: 5, label: 'Simulating scenario stress tests & decision stability' }
];

export const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ decisionTitle, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        setTimeout(() => onComplete(), 400);
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center">
      <div className="glass-card p-8 border-[#00e5ff]/40 shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden">
        {/* Glow */}
        <div className="w-48 h-48 bg-[#00e5ff]/10 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/40 mx-auto flex items-center justify-center text-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.3)] mb-6 animate-pulse">
          <Cpu className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight mb-2">Auditing Decision Context</h2>
        <p className="text-xs text-slate-300 font-mono mb-8 line-clamp-1 text-ellipsis">"{decisionTitle}"</p>

        {/* Steps */}
        <div className="space-y-4 text-left max-w-md mx-auto">
          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all flex items-center space-x-3 ${
                  isDone
                    ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]'
                    : isCurrent
                    ? 'bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff]'
                    : 'bg-[#111827]/40 border-[var(--border-hairline)] text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle className="w-4 h-4 text-[#10b981] shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#00e5ff] animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[10px] font-mono">
                    {step.id}
                  </div>
                )}
                <span className="text-xs font-medium">{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] text-[11px] text-slate-500 font-mono">
          Google Gemma 4 Reasoning Layer + Python Deterministic Scoring Engine
        </div>
      </div>
    </div>
  );
};
