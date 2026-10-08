from app.schemas.decision import DecisionDetail
from app.storage.decision_store import decision_store
from app.services.analysis_service import analysis_service

class ReportService:
    def get_report(self, decision_id: str) -> DecisionDetail:
        detail = decision_store.get(decision_id)
        if not detail.readiness:
            # Run analysis if not yet run
            detail = analysis_service.analyze_decision(decision_id)
        return detail

report_service = ReportService()
