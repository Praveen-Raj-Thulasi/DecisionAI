from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert data["data"]["status"] == "ok"

def test_ai_status_endpoint():
    res = client.get("/api/v1/ai/status")
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert "active_provider" in data["data"]

def test_create_and_analyze_decision():
    # 1. Create decision
    create_payload = {
        "title": "Should we adopt Rust for backend microservices?",
        "options": ["Adopt Rust", "Stay with Go"],
        "requirements": ["High memory safety", "Fast execution"],
        "constraints": ["Small team learning curve"]
    }
    create_res = client.post("/api/v1/decisions", json=create_payload)
    assert create_res.status_code == 201
    decision_id = create_res.json()["data"]["decision_id"]

    # 2. Analyze decision
    analyze_res = client.post(f"/api/v1/decisions/{decision_id}/analyze")
    assert analyze_res.status_code == 200
    analyzed_data = analyze_res.json()["data"]
    assert analyzed_data["readiness"]["score"] >= 0
    assert "facts" in analyzed_data

def test_demo_endpoint():
    res = client.get("/api/v1/demo/postgresql-mongodb")
    assert res.status_code == 200
    data = res.json()["data"]
    assert "PostgreSQL" in data["title"]
    assert data["readiness"]["score"] >= 0
