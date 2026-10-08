from typing import Optional
from pydantic import BaseModel

class StressScenario(BaseModel):
    id: str
    scenario: str
    impact: str  # LOW, MEDIUM, HIGH, CRITICAL
    affected_option: Optional[str] = None
    readiness_delta: int = 0
    explanation: str

class StressTestRequest(BaseModel):
    scenario_id: Optional[str] = None
    custom_scenario: Optional[str] = None

class StressTestResponse(BaseModel):
    decision_id: str
    scenario_executed: str
    original_score: int
    new_score: int
    readiness_delta: int
    stability: str  # HIGH, MEDIUM, LOW
    impact_level: str
    explanation: str
