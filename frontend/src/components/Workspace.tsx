import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, Plus, Trash2, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';
import { DecisionCreateRequest } from '../types';

interface WorkspaceProps {
  onSubmit: (data: DecisionCreateRequest) => void;
  onLoadDemo: () => void;
  isLoading: boolean;
}

export const Workspace: React.FC<WorkspaceProps> = ({ onSubmit, onLoadDemo, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>(['Option A: Stay with current setup', 'Option B: Migrate to new solution']);
  const [context, setContext] = useState('');
  const [requirements, setRequirements] = useState<string[]>(['High performance under peak load', 'Strict transactional integrity']);
  const [constraints, setConstraints] = useState<string[]>(['Small engineering bandwidth', 'Limited budget']);

  const handleAddOption = () => setOptions([...options, `Option ${String.fromCharCode(65 + options.length)}`]);
  const handleRemoveOption = (index: number) => setOptions(options.filter((_, i) => i !== index));

  const handleAddRequirement = () => setRequirements([...requirements, 'New requirement']);
  const handleRemoveRequirement = (index: number) => setRequirements(requirements.filter((_, i) => i !== index));

  const handleAddConstraint = () => setConstraints([...constraints, 'New constraint']);
  const handleRemoveConstraint = (index: number) => setConstraints(constraints.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title,
      description,
      options: options.filter(o => o.trim().length > 0),
      context,
      requirements: requirements.filter(r => r.trim().length > 0),
      constraints: constraints.filter(c => c.trim().length > 0)
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header Banner */}
      <div className="mb-8 p-6 glass-card border-[#00e5ff]/30 bg-gradient-to-r from-[#111827] via-[#0b0f17] to-[#111827] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Decision Workspace</h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Don't ask AI what to choose. Ask AI if you have enough evidence to decide safely. Enter your decision parameters below for a deterministic evidence audit.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <button
                type="button"
                onClick={onLoadDemo}
                className="text-xs px-3.5 py-1.5 rounded-lg bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30 font-semibold transition-all flex items-center space-x-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Quick Fill: PostgreSQL vs MongoDB Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
        {/* Decision Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Decision Title / Proposed Change <span className="text-[#00e5ff]">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Should our startup migrate from PostgreSQL to MongoDB?"
            className="w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] text-white focus:outline-none focus:border-[#00e5ff] text-sm transition-all"
          />
        </div>

        {/* Description & Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Decision Background / Rationale
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why are you considering this decision now? What triggered the evaluation?"
              className="w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] text-white focus:outline-none focus:border-[#00e5ff] text-sm transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              System / Organizational Context
            </label>
            <textarea
              rows={4}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Data volume, current architecture, team size, budget, SLA requirements..."
              className="w-full px-4 py-3 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] text-white focus:outline-none focus:border-[#00e5ff] text-sm transition-all resize-none"
            />
          </div>
        </div>

        {/* Candidate Options */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Candidate Options
            </label>
            <button
              type="button"
              onClick={handleAddOption}
              className="text-xs text-[#00e5ff] hover:underline flex items-center space-x-1 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Option</span>
            </button>
          </div>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-6 text-center text-xs font-mono text-slate-500">{i + 1}.</span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[i] = e.target.value;
                    setOptions(newOpts);
                  }}
                  className="flex-1 px-3.5 py-2 rounded-lg bg-[#0b0f17] border border-[var(--border-hairline)] text-white focus:outline-none focus:border-[#00e5ff] text-sm"
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(i)}
                    className="p-2 text-slate-500 hover:text-[#ef4444] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[var(--border-hairline)]">
          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Explicit Requirements
              </label>
              <button
                type="button"
                onClick={handleAddRequirement}
                className="text-xs text-[#00e5ff] hover:underline flex items-center space-x-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const newReqs = [...requirements];
                      newReqs[i] = e.target.value;
                      setRequirements(newReqs);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-md bg-[#0b0f17] border border-[var(--border-hairline)] text-white text-xs focus:outline-none focus:border-[#00e5ff]"
                  />
                  {requirements.length > 1 && (
                    <button type="button" onClick={() => handleRemoveRequirement(i)} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Known Constraints
              </label>
              <button
                type="button"
                onClick={handleAddConstraint}
                className="text-xs text-[#00e5ff] hover:underline flex items-center space-x-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-2">
              {constraints.map((con, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => {
                      const newCons = [...constraints];
                      newCons[i] = e.target.value;
                      setConstraints(newCons);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-md bg-[#0b0f17] border border-[var(--border-hairline)] text-white text-xs focus:outline-none focus:border-[#00e5ff]"
                  />
                  {constraints.length > 1 && (
                    <button type="button" onClick={() => handleRemoveConstraint(i)} className="text-slate-500 hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex items-center justify-between border-t border-[var(--border-hairline)]">
          <div className="text-xs text-slate-400 flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-[#00e5ff]" />
            <span>Gemma 4 will extract facts & assumptions; Python scoring engine will evaluate readiness.</span>
          </div>
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="px-6 py-3 rounded-lg bg-[#00e5ff] hover:bg-[#38bdf8] text-[#0b0f17] font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center space-x-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Initializing Audit...' : 'Run Decision Audit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
