import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Workspace } from './components/Workspace';
import { AnalysisLoading } from './components/AnalysisLoading';
import { Dashboard } from './components/Dashboard';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { StressTestVisualizer } from './components/StressTestVisualizer';
import { AuditReport } from './components/AuditReport';
import { DecisionDetail, DecisionCreateRequest, AIStatus } from './types';
import { api } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('workspace');
  const [currentDecision, setCurrentDecision] = useState<DecisionDetail | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [pendingDecisionId, setPendingDecisionId] = useState<string | null>(null);

  // Fetch AI Provider Status on Mount
  useEffect(() => {
    api.getAIStatus()
      .then(setAiStatus)
      .catch(() => console.log('Backend offline or starting up'));
  }, []);

  // Handle Form Submission
  const handleCreateDecision = async (data: DecisionCreateRequest) => {
    setIsLoading(true);
    try {
      const res = await api.createDecision(data);
      setPendingDecisionId(res.decision_id);
      setIsAnalyzing(true);
      setActiveTab('loading');
    } catch (err) {
      alert(`Failed to create decision: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Analysis Completion
  const handleAnalysisComplete = async () => {
    if (!pendingDecisionId) return;
    try {
      const analyzed = await api.analyzeDecision(pendingDecisionId);
      setCurrentDecision(analyzed);
      setIsAnalyzing(false);
      setActiveTab('dashboard');
    } catch (err) {
      alert(`Analysis failed: ${err instanceof Error ? err.message : String(err)}`);
      setIsAnalyzing(false);
      setActiveTab('workspace');
    }
  };

  // Handle Loading Pre-built Demo
  const handleLoadDemo = async () => {
    setIsLoading(true);
    try {
      const demo = await api.getDemoDecision();
      setCurrentDecision(demo);
      setActiveTab('dashboard');
    } catch (err) {
      alert(`Failed to load demo: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#dfe2ee] flex flex-col selection:bg-[#00e5ff]/30 selection:text-[#00e5ff]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        aiStatus={aiStatus}
        onLoadDemo={handleLoadDemo}
        hasDecision={!!currentDecision}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'workspace' && (
          <Workspace
            onSubmit={handleCreateDecision}
            onLoadDemo={handleLoadDemo}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'loading' && (
          <AnalysisLoading
            decisionTitle={currentDecision?.title || 'Proposed Decision'}
            onComplete={handleAnalysisComplete}
          />
        )}

        {activeTab === 'dashboard' && currentDecision && (
          <Dashboard
            decision={currentDecision}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'evidence' && currentDecision && (
          <EvidenceExplorer decision={currentDecision} />
        )}

        {activeTab === 'stress-test' && currentDecision && (
          <StressTestVisualizer decision={currentDecision} />
        )}

        {activeTab === 'report' && currentDecision && (
          <AuditReport decision={currentDecision} />
        )}
      </main>

      <footer className="border-t border-[var(--border-hairline)] bg-[#0b0f17] py-4 text-center text-xs text-slate-500 font-mono">
        DecisionShield &copy; 2026  •  Google Gemma 4 Reasoning Layer & Pure Deterministic Decision Readiness Engine
      </footer>
    </div>
  );
};

export default App;
