from typing import Dict, Optional
import uuid
import datetime
from app.schemas.decision import DecisionCreate, DecisionDetail
from app.core.exceptions import DecisionNotFoundException

class InMemoryDecisionStore:
    def __init__(self):
        self._store: Dict[str, DecisionDetail] = {}

    def create(self, data: DecisionCreate) -> DecisionDetail:
        decision_id = str(uuid.uuid4())[:8]
        detail = DecisionDetail(
            decision_id=decision_id,
            title=data.title,
            description=data.description,
            options=data.options,
            context=data.context,
            requirements=data.requirements,
            constraints=data.constraints,
            status="CREATED"
        )
        self._store[decision_id] = detail
        return detail

    def get(self, decision_id: str) -> DecisionDetail:
        if decision_id not in self._store:
            raise DecisionNotFoundException(decision_id)
        return self._store[decision_id]

    def update(self, decision_id: str, detail: DecisionDetail) -> DecisionDetail:
        self._store[decision_id] = detail
        return detail

    def exists(self, decision_id: str) -> bool:
        return decision_id in self._store

decision_store = InMemoryDecisionStore()
