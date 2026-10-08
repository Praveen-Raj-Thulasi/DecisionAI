import pytest
from app.engine.readiness import readiness_engine
from app.schemas.analysis import AIAnalysisOutput
from app.schemas.evidence import Fact, Assumption, Unknown
from app.schemas.risk import Risk

def test_deterministic_scoring_reproducibility():
    analysis = AIAnalysisOutput(
        summary="Test analysis",
        facts=[Fact(id="f1", statement="Confirmed fact", confidence=0.9)],
        assumptions=[Assumption(id="a1", statement="High risk assumption", risk_level="HIGH")],
        unknowns=[Unknown(id="u1", statement="Critical gap", criticality="HIGH")],
        risks=[Risk(id="r1", category="Technical", description="High risk", severity="HIGH")]
    )
    
    metrics1 = readiness_engine.calculate(analysis, total_requirements=2)
    metrics2 = readiness_engine.calculate(analysis, total_requirements=2)
    
    assert metrics1.score == metrics2.score
    assert metrics1.status == metrics2.status
    assert metrics1.score < 80  # Penalties for assumption & unknown should prevent READY status
    assert metrics1.status in ["CAUTION", "NOT_READY"]

def test_ready_status_threshold():
    perfect_analysis = AIAnalysisOutput(
        summary="Perfect analysis",
        facts=[
            Fact(id="f1", statement="Fact 1", confidence=1.0),
            Fact(id="f2", statement="Fact 2", confidence=1.0),
            Fact(id="f3", statement="Fact 3", confidence=1.0),
            Fact(id="f4", statement="Fact 4", confidence=1.0)
        ],
        assumptions=[],
        unknowns=[],
        risks=[]
    )
    metrics = readiness_engine.calculate(perfect_analysis, total_requirements=1)
    assert metrics.score >= 80
    assert metrics.status == "READY"
