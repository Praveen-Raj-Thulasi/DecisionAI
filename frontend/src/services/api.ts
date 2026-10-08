import {
  DecisionCreateRequest,
  DecisionDetail,
  StressTestResponse,
  AIStatus
} from '../types';

const API_BASE = '/api/v1';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const payload = await res.json();
  if (!res.ok || !payload.success) {
    throw new Error(payload?.error?.message || `API error: HTTP ${res.status}`);
  }
  return payload.data as T;
}

export const api = {
  getHealth: async (): Promise<{ status: string; version: string }> => {
    return fetchJSON(`${API_BASE}/health`);
  },

  getAIStatus: async (): Promise<AIStatus> => {
    return fetchJSON(`${API_BASE}/ai/status`);
  },

  createDecision: async (data: DecisionCreateRequest): Promise<{ decision_id: string; status: string; title: string }> => {
    return fetchJSON(`${API_BASE}/decisions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  analyzeDecision: async (decisionId: string): Promise<DecisionDetail> => {
    return fetchJSON(`${API_BASE}/decisions/${decisionId}/analyze`, {
      method: 'POST',
    });
  },

  getDecision: async (decisionId: string): Promise<DecisionDetail> => {
    return fetchJSON(`${API_BASE}/decisions/${decisionId}`);
  },

  getReport: async (decisionId: string): Promise<DecisionDetail> => {
    return fetchJSON(`${API_BASE}/decisions/${decisionId}/report`);
  },

  runStressTest: async (decisionId: string, scenarioId?: string, customScenario?: string): Promise<StressTestResponse> => {
    return fetchJSON(`${API_BASE}/decisions/${decisionId}/stress-test`, {
      method: 'POST',
      body: JSON.stringify({
        scenario_id: scenarioId,
        custom_scenario: customScenario,
      }),
    });
  },

  getDemoDecision: async (): Promise<DecisionDetail> => {
    return fetchJSON(`${API_BASE}/demo/postgresql-mongodb`);
  }
};
