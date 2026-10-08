# DecisionShield: Frontend to Backend API Mapping

This document details the mapping between the **Stitch-generated UI screens**, user actions, frontend components, and the **FastAPI REST API endpoints**.

---

## 🗺️ Page & Component API Mapping

### 1. Decision Workspace Screen (`/workspace`)
* **Stitch Screen**: `Decision Workspace` (`projects/4703807166586891485/screens/9e1696fa494c4305af58e29c21be2809`)
* **Purpose**: Input decision details, candidate options, organizational context, requirements, and constraints.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Initial Load** | Quick Demo Button | `GET /api/v1/demo/postgresql-mongodb` | None | `DemoDecision` | Pre-fills workspace form with PostgreSQL $\rightarrow$ MongoDB demo data |
| **Form Submit** | "Begin Decision Audit" Button | `POST /api/v1/decisions` | `DecisionCreate` | `DecisionResponse` | Obtains `decision_id`, navigates to Analysis Loading screen |

---

### 2. Decision Analysis Loading Screen (`/analysis/:id`)
* **Stitch Screen**: `Decision Analysis Loading` (`projects/4703807166586891485/screens/7a0656cf1bec4024b438ee8c88d217af`)
* **Purpose**: Displays dynamic step-by-step pipeline execution while Gemma 4 parses context and the scoring engine computes metrics.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **On Mount** | Pipeline Step Tracker | `POST /api/v1/decisions/{id}/analyze` | None | `AnalysisResponse` | Updates step status (`UNDERSTANDING` $\rightarrow$ `EVIDENCE` $\rightarrow$ `SCORING` $\rightarrow$ `COMPLETE`), redirects to Dashboard on success |

---

### 3. Decision Readiness Dashboard Screen (`/dashboard/:id`)
* **Stitch Screen**: `Decision Readiness Dashboard` (`projects/4703807166586891485/screens/78c57968fbfa4f0ab040c6aac2c3eee9`)
* **Purpose**: Executive overview featuring the non-hallucinated Decision Readiness Score, gauge meter, readiness status (`READY`, `CAUTION`, `NOT_READY`), and metric dimensions.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **On Mount / Refresh** | Score Gauge & Metrics Grid | `GET /api/v1/decisions/{id}` | None | `DecisionDetail` | Renders readiness score gauge, status badge, evidence quality, requirement coverage, and assumption load |

---

### 4. Evidence Explorer & Missing Evidence Tabs
* **Stitch Screen**: Dashboard Sub-panels
* **Purpose**: Categorized analysis of extracted items.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tab Switch** | Facts / Assumptions / Unknowns Tabs | Rendered from `GET /api/v1/decisions/{id}` payload | None | `EvidenceItem[]` | Filters lists of classified evidence with risk levels and confidence scores |
| **Action Check** | Verification Checklist | Local UI toggle | None | None | Marks verification actions as completed in local state |

---

### 5. Stress Testing Page (`/stress-test/:id`)
* **Stitch Screen**: Stress Test Visualizer
* **Purpose**: Run what-if scenario simulations to evaluate decision stability under changing external conditions.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Select / Run Scenario**| "Simulate Scenario" Button | `POST /api/v1/decisions/{id}/stress-test` | `StressTestRequest` | `StressTestResponse` | Renders impact score, new readiness score, and updates Decision Stability Index |

---

### 6. Final Decision Audit Report Page (`/report/:id`)
* **Stitch Screen**: Audit Report Viewer
* **Purpose**: Comprehensive, exportable decision audit summary.

| User Action | UI Component | API Endpoint | Request Body | Response Data | UI Update |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **On Mount** | Full Report Container | `GET /api/v1/decisions/{id}/report` | None | `AuditReportResponse` | Displays complete audit document with executive summary, evidence ledger, risk matrix, and action plan |

---

## 🔌 System Status & Health Endpoints

| Endpoint | Method | Response | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/v1/health` | `GET` | `{"status": "ok", "version": "1.0.0"}` | Application health check |
| `/api/v1/ai/status` | `GET` | `{"provider": "Gemma 4 (Ollama)" \| "Demo Provider", "model": "gemma4:e4b"}` | Real-time AI reasoning layer status |
