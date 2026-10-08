from fastapi import APIRouter
from app.schemas.stress_test import StressTestRequest, StressTestResponse
from app.schemas.response import APIResponse
from app.services.stress_test_service import stress_test_service

router = APIRouter(tags=["Stress Test"])

@router.post("/decisions/{decision_id}/stress-test", response_model=APIResponse[StressTestResponse])
def run_stress_test(decision_id: str, request: StressTestRequest):
    res = stress_test_service.run_stress_test(decision_id, request)
    return APIResponse(success=True, data=res)
