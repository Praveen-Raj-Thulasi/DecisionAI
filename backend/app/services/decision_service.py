from app.schemas.decision import DecisionCreate, DecisionDetail, DecisionResponse
from app.storage.decision_store import decision_store

class DecisionService:
    def create_decision(self, data: DecisionCreate) -> DecisionResponse:
        detail = decision_store.create(data)
        return DecisionResponse(
            decision_id=detail.decision_id,
            status=detail.status,
            title=detail.title,
            created_at="Just now"
        )

    def get_decision(self, decision_id: str) -> DecisionDetail:
        return decision_store.get(decision_id)

decision_service = DecisionService()
