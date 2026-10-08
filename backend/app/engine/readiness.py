from app.schemas.analysis import AIAnalysisOutput, ReadinessMetrics

class DeterministicReadinessEngine:
    @staticmethod
    def calculate(analysis: AIAnalysisOutput, total_requirements: int = 1) -> ReadinessMetrics:
        # 1. Evidence Quality (0 - 100)
        facts_count = len(analysis.facts)
        avg_confidence = (
            sum(f.confidence for f in analysis.facts) / facts_count
            if facts_count > 0 else 0.4
        )
        evidence_quality = int(min(100, (facts_count * 15 + avg_confidence * 40)))

        # 2. Requirement Coverage (0 - 100)
        req_count = max(1, total_requirements)
        covered_count = max(0, facts_count - len(analysis.contradictions))
        requirement_coverage = int(min(100, (covered_count / req_count) * 100)) if req_count > 0 else 70

        # 3. Risk Coverage (0 - 100)
        critical_risks = sum(1 for r in analysis.risks if r.severity in ["CRITICAL", "HIGH"])
        total_risks = len(analysis.risks)
        if total_risks == 0:
            risk_coverage = 90
        else:
            risk_coverage = int(max(0, 100 - (critical_risks * 25 + (total_risks - critical_risks) * 10)))

        # 4. Assumption Load (0 - 100 penalty index: lower is better)
        high_risk_assumptions = sum(1 for a in analysis.assumptions if a.risk_level in ["HIGH", "CRITICAL"])
        assumption_load = int(min(100, len(analysis.assumptions) * 15 + high_risk_assumptions * 20))

        # 5. Unknowns Penalty Index (0 - 100 penalty index: lower is better)
        critical_unknowns = sum(1 for u in analysis.unknowns if u.criticality in ["HIGH", "CRITICAL"])
        unknowns_score = int(min(100, len(analysis.unknowns) * 12 + critical_unknowns * 20))

        # 6. Decision Stability Index (0 - 100)
        base_stability = 85
        stability_penalty = (high_risk_assumptions * 10) + (critical_unknowns * 12) + (critical_risks * 15)
        decision_stability = int(max(10, min(100, base_stability - stability_penalty)))

        # 7. Final Deterministic Overall Readiness Score (0 - 100)
        # Formula:
        # Base Score: 50
        # + Evidence Quality bonus (up to +25)
        # + Requirement Coverage bonus (up to +20)
        # - Assumption Load penalty (up to -25)
        # - Unknowns penalty (up to -25)
        # - Risk penalty (up to -25)
        
        base_score = 50.0
        bonus_evidence = (evidence_quality / 100.0) * 25.0
        bonus_requirements = (requirement_coverage / 100.0) * 20.0
        
        penalty_assumptions = (assumption_load / 100.0) * 25.0
        penalty_unknowns = (unknowns_score / 100.0) * 25.0
        penalty_risks = ((100 - risk_coverage) / 100.0) * 25.0

        raw_score = base_score + bonus_evidence + bonus_requirements - penalty_assumptions - penalty_unknowns - penalty_risks
        final_score = int(max(0, min(100, round(raw_score))))

        # Determine Status
        if final_score >= 80 and critical_unknowns == 0:
            status = "READY"
        elif final_score >= 60:
            status = "CAUTION"
        else:
            status = "NOT_READY"

        return ReadinessMetrics(
            score=final_score,
            status=status,
            evidence_quality=evidence_quality,
            requirement_coverage=requirement_coverage,
            risk_coverage=risk_coverage,
            assumption_load=assumption_load,
            unknowns=unknowns_score,
            decision_stability=decision_stability
        )

readiness_engine = DeterministicReadinessEngine()
