from app.schemas.stress_test import StressTestRequest, StressTestResponse
from app.storage.decision_store import decision_store
from app.core.exceptions import DecisionShieldException

class StressTestService:
    def run_stress_test(self, decision_id: str, request: StressTestRequest) -> StressTestResponse:
        detail = decision_store.get(decision_id)
        if not detail.readiness:
            raise DecisionShieldException("Decision must be analyzed before running stress tests.", code="UNANALYZED_DECISION", status_code=400)

        orig_score = detail.readiness.score

        # Match selected scenario or custom scenario
        scenario_text = "Custom scenario simulation"
        delta = -15
        impact = "HIGH"

        if request.scenario_id:
            match = next((s for s in detail.stress_scenarios if s.id == request.scenario_id), None)
            if match:
                scenario_text = match.scenario
                delta = match.readiness_delta if match.readiness_delta != 0 else -15
                impact = match.impact
        elif request.custom_scenario:
            scenario_text = request.custom_scenario
            delta = -20
            impact = "CRITICAL"

        new_score = max(0, min(100, orig_score + delta))
        
        # Stability determination
        if abs(delta) >= 20 or new_score < 50:
            stability = "LOW"
        elif abs(delta) >= 10:
            stability = "MEDIUM"
        else:
            stability = "HIGH"

        explanation = f"Under stress scenario '{scenario_text}', readiness score shifts from {orig_score}% to {new_score}% (delta: {delta}%). Stability index is evaluated as {stability}."

        # Update detail decision stability metric
        detail.readiness.decision_stability = max(10, detail.readiness.decision_stability + delta)
        decision_store.update(decision_id, detail)

        return StressTestResponse(
            decision_id=decision_id,
            scenario_executed=scenario_text,
            original_score=orig_score,
            new_score=new_score,
            readiness_delta=delta,
            stability=stability,
            impact_level=impact,
            explanation=explanation
        )

stress_test_service = StressTestService()
