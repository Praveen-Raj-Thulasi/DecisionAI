import React, { useState } from 'react';
import { Activity, Zap, AlertTriangle, ShieldCheck, ArrowDown, Play } from 'lucide-react';
import { DecisionDetail, StressTestResponse } from '../types';
import { api } from '../services/api';

interface StressTestVisualizerProps {
  decision: DecisionDetail;
}

export const StressTestVisualizer: React.FC<StressTestVisualizerProps> = ({ decision }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(decision.stress_scenarios[0]?.id || '');
  const [customScenario, setCustomScenario] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<StressTestResponse | null>(null);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await api.runStressTest(
        decision.decision_id,
        selectedScenarioId || undefined,
        customScenario || undefined
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--border-hairline)] pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
          <Activity className="w-6 h-6 text-[#00e5ff]" />
          <span>Decision Stress Testing & Sensitivity Simulator</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulate external operational shocks (traffic spikes, budget cuts, team turnover) to test if your decision remains stable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Selector Form */}
        <div className="glass-card p-6 border-[var(--border-hairline)] space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Stress Scenario
          </h3>

          {/* Pre-generated Scenarios */}
          <div className="space-y-2">
            {decision.stress_scenarios.map((sc) => (
              <div
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setCustomScenario('');
                }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedScenarioId === sc.id && !customScenario
                    ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'bg-[#0b0f17] border-[var(--border-hairline)] hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{sc.scenario}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">
                    {sc.impact}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{sc.explanation}</p>
              </div>
            ))}
          </div>

          {/* Custom Scenario Input */}
          <div className="pt-2 border-t border-[var(--border-hairline)]">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Or Enter Custom What-If Scenario
            </label>
            <input
              type="text"
              value={customScenario}
              onChange={(e) => {
                setCustomScenario(e.target.value);
                setSelectedScenarioId('');
              }}
              placeholder="e.g. Compliance regulations double reporting overhead"
              className="w-full px-3 py-2 rounded-md bg-[#0b0f17] border border-[var(--border-hairline)] text-white text-xs focus:outline-none focus:border-[#00e5ff]"
            />
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3 rounded-lg bg-[#00e5ff] hover:bg-[#38bdf8] text-[#0b0f17] font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isSimulating ? 'Simulating Impact...' : 'Run Scenario Stress Test'}</span>
          </button>
        </div>

        {/* Right Column: Simulation Result Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <div className="glass-card-elevated p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#00e5ff] uppercase font-bold">SIMULATION COMPLETED</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{result.scenario_executed}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  result.stability === 'HIGH' ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40' :
                  result.stability === 'MEDIUM' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40' :
                  'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40'
                }`}>
                  STABILITY: {result.stability}
                </span>
              </div>

              {/* Score Shift Comparison Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)]">
                  <span className="text-xs text-slate-400">Baseline Readiness</span>
                  <div className="text-3xl font-mono font-bold text-white mt-1">{result.original_score}%</div>
                </div>

                <div className="p-4 rounded-lg bg-[#0b0f17] border border-[#ef4444]/30 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400">Impact Delta</span>
                  <div className="text-2xl font-mono font-bold text-[#ef4444] mt-1 flex items-center space-x-1">
                    <ArrowDown className="w-5 h-5" />
                    <span>{result.readiness_delta}%</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0b0f17] border border-[#00e5ff]/30">
                  <span className="text-xs text-slate-400">Stressed Readiness</span>
                  <div className="text-3xl font-mono font-bold text-[#00e5ff] mt-1">{result.new_score}%</div>
                </div>
              </div>

              {/* Explanation & Mitigation */}
              <div className="p-4 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#00e5ff] font-bold">Stress Impact Analysis</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{result.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-slate-400 space-y-3">
              <Zap className="w-10 h-10 text-[#00e5ff] mx-auto animate-pulse" />
              <h3 className="text-base font-bold text-white">Select a scenario to run stress testing</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Evaluates how resilient your decision foundation is when underlying parameters shift.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
