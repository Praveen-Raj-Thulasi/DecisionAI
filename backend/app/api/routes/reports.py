from fastapi import APIRouter
from app.schemas.decision import DecisionDetail
from app.schemas.response import APIResponse
from app.services.report_service import report_service

router = APIRouter(tags=["Audit Reports"])

@router.get("/decisions/{decision_id}/report", response_model=APIResponse[DecisionDetail])
def get_decision_report(decision_id: str):
    report = report_service.get_report(decision_id)
    return APIResponse(success=True, data=report)
