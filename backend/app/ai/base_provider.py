from abc import ABC, abstractmethod
from app.schemas.decision import DecisionCreate
from app.schemas.analysis import AIAnalysisOutput

class BaseAIProvider(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def is_available(self) -> bool:
        pass

    @abstractmethod
    def analyze(self, decision_data: DecisionCreate) -> AIAnalysisOutput:
        pass
