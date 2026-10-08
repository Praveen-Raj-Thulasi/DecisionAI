export interface Fact {
  id: string;
  statement: string;
  confidence: number;
  source?: string;
}

export interface Assumption {
  id: string;
  statement: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impact: string;
}

export interface Claim {
  id: string;
  statement: string;
  verified: boolean;
  evidence_required: string;
}

export interface Unknown {
  id: string;
  statement: string;
  criticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface MissingEvidence {
  id: string;
  title: string;
  importance: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reason: string;
  verification_action: string;
  decision_impact: string;
}

export interface VerificationAction {
  id: string;
  title: string;
  target_item: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
}

export interface Risk {
  id: string;
  category: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  likelihood: string;
  confidence: number;
  mitigation_suggested?: string;
}

export interface StressScenario {
  id: string;
  scenario: string;
  impact: string;
  affected_option?: string;
  readiness_delta: number;
  explanation: string;
}

export interface ReadinessMetrics {
  score: number;
  status: 'READY' | 'CAUTION' | 'NOT_READY';
  evidence_quality: number;
  requirement_coverage: number;
  risk_coverage: number;
  assumption_load: number;
  unknowns: number;
  decision_stability: number;
}

export interface DecisionDetail {
  decision_id: string;
  title: string;
  description?: string;
  options: string[];
  context?: string;
  requirements: string[];
  constraints: string[];
  status: string;
  readiness?: ReadinessMetrics;
  summary?: string;
  facts: Fact[];
  assumptions: Assumption[];
  claims: Claim[];
  unknowns: Unknown[];
  contradictions: string[];
  risks: Risk[];
  missing_evidence: MissingEvidence[];
  verification_actions: VerificationAction[];
  stress_scenarios: StressScenario[];
  provider_used: string;
}

export interface DecisionCreateRequest {
  title: string;
  description?: string;
  options: string[];
  context?: string;
  requirements?: string[];
  constraints?: string[];
}

export interface StressTestResponse {
  decision_id: string;
  scenario_executed: string;
  original_score: number;
  new_score: number;
  readiness_delta: number;
  stability: 'HIGH' | 'MEDIUM' | 'LOW';
  impact_level: string;
  explanation: string;
}

export interface AIStatus {
  active_provider: string;
  gemma_available: boolean;
  demo_mode: boolean;
  model_configured: string;
}
