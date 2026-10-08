from fastapi import APIRouter
from app.ai.model_manager import model_manager
from app.schemas.response import APIResponse
from app.core.config import settings

router = APIRouter(tags=["Health & Status"])

@router.get("/health", response_model=APIResponse[dict])
def health_check():
    return APIResponse(
        success=True,
        data={
            "status": "ok",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT
        }
    )

@router.get("/ai/status", response_model=APIResponse[dict])
def ai_status():
    return APIResponse(
        success=True,
        data=model_manager.get_status()
    )
