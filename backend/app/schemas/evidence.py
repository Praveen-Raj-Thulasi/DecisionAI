from typing import Optional
from pydantic import BaseModel, Field

class Fact(BaseModel):
    id: str
    statement: str
    confidence: float = Field(default=1.0, ge=0.0, le=1.0)
    source: Optional[str] = "User Context"

class Assumption(BaseModel):
    id: str
    statement: str
    risk_level: str = "HIGH"  # LOW, MEDIUM, HIGH, CRITICAL
    impact: str = "HIGH"

class Claim(BaseModel):
    id: str
    statement: str
    verified: bool = False
    evidence_required: str

class Unknown(BaseModel):
    id: str
    statement: str
    criticality: str = "HIGH"  # LOW, MEDIUM, HIGH, CRITICAL

class MissingEvidence(BaseModel):
    id: str
    title: str
    importance: str = "CRITICAL"  # LOW, MEDIUM, HIGH, CRITICAL
    reason: str
    verification_action: str
    decision_impact: str

class VerificationAction(BaseModel):
    id: str
    title: str
    target_item: str
    priority: str = "HIGH"
    completed: bool = False
