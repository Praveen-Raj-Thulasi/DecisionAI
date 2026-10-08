from app.ai.base_provider import BaseAIProvider
from app.ai.gemma_provider import gemma_provider
from app.ai.demo_provider import demo_provider
from app.core.config import settings

class ModelManager:
    def get_provider(self) -> BaseAIProvider:
        if not settings.DEMO_MODE and gemma_provider.is_available():
            return gemma_provider
        return demo_provider

    def get_status(self) -> dict:
        gemma_avail = gemma_provider.is_available()
        active = "Gemma 4 (Ollama)" if (gemma_avail and not settings.DEMO_MODE) else "Demo Provider"
        return {
            "active_provider": active,
            "gemma_available": gemma_avail,
            "demo_mode": settings.DEMO_MODE,
            "model_configured": settings.GEMMA_MODEL
        }

model_manager = ModelManager()
