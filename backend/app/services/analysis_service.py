from app.schemas.decision import DecisionDetail, DecisionCreate
from app.storage.decision_store import decision_store
from app.ai.model_manager import model_manager
from app.engine.readiness import readiness_engine

class AnalysisService:
    def analyze_decision(self, decision_id: str) -> DecisionDetail:
        detail = decision_store.get(decision_id)
        
        # Prepare input payload for AI
        create_data = DecisionCreate(
            title=detail.title,
            description=detail.description,
            options=detail.options,
            context=detail.context,
            requirements=detail.requirements,
            constraints=detail.constraints
        )

        # 1. AI Reasoning Layer (Gemma 4 or Demo Fallback)
        provider = model_manager.get_provider()
        ai_output = provider.analyze(create_data)

        # 2. Deterministic Readiness Engine Calculation
        metrics = readiness_engine.calculate(
            analysis=ai_output,
            total_requirements=len(detail.requirements)
        )

        # 3. Update Decision Store
        detail.status = "ANALYSIS_COMPLETE"
        detail.readiness = metrics
        detail.summary = ai_output.summary
        detail.facts = ai_output.facts
        detail.assumptions = ai_output.assumptions
        detail.claims = ai_output.claims
        detail.unknowns = ai_output.unknowns
        detail.contradictions = ai_output.contradictions
        detail.risks = ai_output.risks
        detail.missing_evidence = ai_output.missing_evidence
        detail.verification_actions = ai_output.verification_actions
        detail.stress_scenarios = ai_output.stress_scenarios
        detail.provider_used = provider.name

        return decision_store.update(decision_id, detail)

analysis_service = AnalysisService()
