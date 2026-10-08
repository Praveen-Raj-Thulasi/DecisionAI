from fastapi import APIRouter
from app.schemas.decision import DecisionDetail
from app.schemas.response import APIResponse
from app.services.analysis_service import analysis_service

router = APIRouter(tags=["Analysis"])

@router.post("/decisions/{decision_id}/analyze", response_model=APIResponse[DecisionDetail])
def analyze_decision(decision_id: str):
    detail = analysis_service.analyze_decision(decision_id)
    return APIResponse(success=True, data=detail)
