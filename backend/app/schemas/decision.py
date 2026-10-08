from typing import List, Optional
from pydantic import BaseModel, Field
from app.schemas.analysis import ReadinessMetrics, AIAnalysisOutput
from app.schemas.evidence import Fact, Assumption, Claim, Unknown, MissingEvidence, VerificationAction
from app.schemas.risk import Risk
from app.schemas.stress_test import StressScenario

class DecisionCreate(BaseModel):
    title: str = Field(min_length=3, description="Decision title or question")
    description: Optional[str] = ""
    options: List[str] = Field(min_items=1, description="List of options considered")
    context: Optional[str] = ""
    requirements: List[str] = Field(default_factory=list)
    constraints: List[str] = Field(default_factory=list)
    evidence: List[str] = Field(default_factory=list)

class DecisionResponse(BaseModel):
    decision_id: str
    status: str
    title: str
    created_at: str

class DecisionDetail(BaseModel):
    decision_id: str
    title: str
    description: Optional[str]
    options: List[str]
    context: Optional[str]
    requirements: List[str]
    constraints: List[str]
    status: str
    readiness: Optional[ReadinessMetrics] = None
    summary: Optional[str] = None
    facts: List[Fact] = []
    assumptions: List[Assumption] = []
    claims: List[Claim] = []
    unknowns: List[Unknown] = []
    contradictions: List[str] = []
    risks: List[Risk] = []
    missing_evidence: List[MissingEvidence] = []
    verification_actions: List[VerificationAction] = []
    stress_scenarios: List[StressScenario] = []
    provider_used: str = "Demo Provider"
