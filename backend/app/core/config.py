import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DecisionShield API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    PORT: int = 8000
    ENVIRONMENT: str = "development"
    FRONTEND_URL: str = "http://localhost:5173"
    
    # Ollama / Gemma 4 settings
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    GEMMA_MODEL: str = "gemma4:e4b"
    GEMMA_TIMEOUT_SECONDS: int = 60
    DEMO_MODE: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
