from typing import Optional
from pydantic import BaseModel

class Risk(BaseModel):
    id: str
    category: str  # Technical, Financial, Operational, Compliance
    description: str
    severity: str  # LOW, MEDIUM, HIGH, CRITICAL
    likelihood: str = "MEDIUM"
    confidence: float = 0.8
    mitigation_suggested: Optional[str] = None
