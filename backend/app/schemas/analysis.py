from typing import List, Optional
from pydantic import BaseModel, Field
from app.schemas.evidence import Fact, Assumption, Claim, Unknown, MissingEvidence, VerificationAction
from app.schemas.risk import Risk
from app.schemas.stress_test import StressScenario

class ReadinessMetrics(BaseModel):
    score: int = Field(ge=0, le=100)
    status: str  # READY, CAUTION, NOT_READY
    evidence_quality: int = Field(ge=0, le=100)
    requirement_coverage: int = Field(ge=0, le=100)
    risk_coverage: int = Field(ge=0, le=100)
    assumption_load: int = Field(ge=0, le=100)
    unknowns: int = Field(ge=0, le=100)
    decision_stability: int = Field(ge=0, le=100)

class AIAnalysisOutput(BaseModel):
    summary: str
    facts: List[Fact] = []
    assumptions: List[Assumption] = []
    claims: List[Claim] = []
    unknowns: List[Unknown] = []
    contradictions: List[str] = []
    risks: List[Risk] = []
    missing_evidence: List[MissingEvidence] = []
    verification_actions: List[VerificationAction] = []
    stress_scenarios: List[StressScenario] = []
