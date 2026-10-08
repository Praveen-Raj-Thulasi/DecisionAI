import requests
from app.ai.base_provider import BaseAIProvider
from app.ai.prompts import SYSTEM_PROMPT
from app.ai.parser import parser
from app.schemas.decision import DecisionCreate
from app.schemas.analysis import AIAnalysisOutput
from app.core.config import settings
from app.core.exceptions import AIModelException

class GemmaProvider(BaseAIProvider):
    def __init__(self):
        self.base_url = settings.OLLAMA_BASE_URL
        self.model_name = settings.GEMMA_MODEL
        self.timeout = settings.GEMMA_TIMEOUT_SECONDS

    @property
    def name(self) -> str:
        return f"Gemma 4 ({self.model_name})"

    def is_available(self) -> bool:
        try:
            res = requests.get(f"{self.base_url}/api/tags", timeout=3)
            if res.status_code == 200:
                models = res.json().get("models", [])
                # Check if model starts with gemma
                return any(self.model_name.split(":")[0] in m.get("name", "") for m in models)
            return False
        except Exception:
            return False

    def analyze(self, decision_data: DecisionCreate) -> AIAnalysisOutput:
        prompt_text = SYSTEM_PROMPT.format(
            title=decision_data.title,
            description=decision_data.description or "N/A",
            options=", ".join(decision_data.options),
            context=decision_data.context or "N/A",
            requirements=", ".join(decision_data.requirements) if decision_data.requirements else "None specified",
            constraints=", ".join(decision_data.constraints) if decision_data.constraints else "None specified"
        )

        payload = {
            "model": self.model_name,
            "prompt": prompt_text,
            "stream": False,
            "options": {
                "temperature": 0.2,
                "top_p": 0.9
            }
        }

        try:
            res = requests.post(f"{self.base_url}/api/generate", json=payload, timeout=self.timeout)
            if res.status_code == 200:
                response_text = res.json().get("response", "")
                return parser.parse_and_validate(response_text)
            else:
                raise AIModelException(f"Ollama returned HTTP {res.status_code}: {res.text}")
        except Exception as e:
            raise AIModelException(f"Gemma inference failed: {str(e)}")

gemma_provider = GemmaProvider()
