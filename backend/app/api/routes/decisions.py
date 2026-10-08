from fastapi import APIRouter
from app.schemas.decision import DecisionCreate, DecisionResponse, DecisionDetail
from app.schemas.response import APIResponse
from app.services.decision_service import decision_service
from app.services.analysis_service import analysis_service

router = APIRouter(tags=["Decisions"])

@router.post("/decisions", response_model=APIResponse[DecisionResponse], status_code=201)
def create_decision(data: DecisionCreate):
    res = decision_service.create_decision(data)
    return APIResponse(success=True, data=res)

@router.get("/decisions/{decision_id}", response_model=APIResponse[DecisionDetail])
def get_decision(decision_id: str):
    detail = decision_service.get_decision(decision_id)
    return APIResponse(success=True, data=detail)

@router.get("/demo/postgresql-mongodb", response_model=APIResponse[DecisionDetail])
def get_demo_decision():
    demo_create = DecisionCreate(
        title="Should our startup migrate from PostgreSQL to MongoDB?",
        description="We are experiencing query slowdowns on our startup's primary web application. Our dataset is around 2TB stored in PostgreSQL. We are considering migrating to MongoDB because document stores scale better horizontally.",
        options=["Stay with PostgreSQL", "Migrate to MongoDB"],
        context="Primary dataset is 2TB relational data. Team has 4 full-stack engineers.",
        requirements=["High horizontal scalability", "Low operational refactoring complexity", "ACID transactional consistency"],
        constraints=["Small engineering team", "Limited bandwidth", "Zero downtime budget"]
    )
    created = decision_service.create_decision(demo_create)
    analyzed = analysis_service.analyze_decision(created.decision_id)
    return APIResponse(success=True, data=analyzed)
