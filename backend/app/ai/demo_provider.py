from app.ai.base_provider import BaseAIProvider
from app.schemas.decision import DecisionCreate
from app.schemas.analysis import AIAnalysisOutput
from app.schemas.evidence import Fact, Assumption, Claim, Unknown, MissingEvidence, VerificationAction
from app.schemas.risk import Risk
from app.schemas.stress_test import StressScenario

class DemoProvider(BaseAIProvider):
    @property
    def name(self) -> str:
        return "Demo Provider"

    def is_available(self) -> bool:
        return True

    def analyze(self, decision_data: DecisionCreate) -> AIAnalysisOutput:
        # Realistic analysis payload for demo decision (PostgreSQL vs MongoDB or custom decision)
        is_db_demo = "mongodb" in decision_data.title.lower() or "postgresql" in decision_data.title.lower()

        if is_db_demo:
            return AIAnalysisOutput(
                summary="The proposed migration from PostgreSQL to MongoDB carries significant unverified assumptions regarding query workload patterns and ACID transaction guarantees. While horizontal scalability is expected, critical evidence regarding peak IOPS and application refactoring overhead is missing.",
                facts=[
                    Fact(id="f1", statement="Current primary database is PostgreSQL with 2TB storage volume.", confidence=0.98, source="User System Context"),
                    Fact(id="f2", statement="Engineering team consists of 4 full-stack developers.", confidence=0.95, source="Team Context")
                ],
                assumptions=[
                    Assumption(id="a1", statement="MongoDB will automatically solve query latency bottlenecks without index redesign.", risk_level="HIGH", impact="HIGH"),
                    Assumption(id="a2", statement="Application document structure can easily replace relational foreign key constraints.", risk_level="CRITICAL", impact="CRITICAL")
                ],
                claims=[
                    Claim(id="c1", statement="Document databases reduce maintenance overhead by 50% for all startup workloads.", verified=False, evidence_required="Independent benchmark report for startup workload profile")
                ],
                unknowns=[
                    Unknown(id="u1", statement="Current Read/Write IOPS ratio and index utilization metrics in PostgreSQL.", criticality="CRITICAL"),
                    Unknown(id="u2", statement="Frequency of multi-table ACID transactions required across microservices.", criticality="HIGH")
                ],
                contradictions=[
                    "Stated constraint of 'Small engineering team with limited bandwidth' contradicts the high operational refactoring effort required for a document schema migration."
                ],
                risks=[
                    Risk(id="r1", category="Technical", description="Loss of relational integrity guarantees leading to application-level data corruption.", severity="CRITICAL", likelihood="HIGH", confidence=0.9),
                    Risk(id="r2", category="Operational", description="Team lack of deep MongoDB indexing and cluster sharding operational expertise.", severity="HIGH", likelihood="MEDIUM", confidence=0.85)
                ],
                missing_evidence=[
                    MissingEvidence(
                        id="m1",
                        title="PostgreSQL Query Index Profiling Report",
                        importance="CRITICAL",
                        reason="Determines whether query slowdowns are caused by missing indexes or actual database engine limitations.",
                        verification_action="Run EXPLAIN ANALYZE on top 20 slowest production queries.",
                        decision_impact="High - If index optimization solves latency, migration is unnecessary."
                    ),
                    MissingEvidence(
                        id="m2",
                        title="Multi-Document Transaction Frequency Audit",
                        importance="HIGH",
                        reason="Audits how many relational joins must be handled in application logic after migrating.",
                        verification_action="Audit repository ORM calls for cross-table transactions.",
                        decision_impact="High - Document schema complexity could increase application code debt."
                    )
                ],
                verification_actions=[
                    VerificationAction(id="v1", title="Run EXPLAIN ANALYZE on slow PostgreSQL queries", target_item="PostgreSQL Performance", priority="HIGH", completed=False),
                    VerificationAction(id="v2", title="Benchmark MongoDB cluster under 3x peak write load", target_item="MongoDB Scalability", priority="MEDIUM", completed=False)
                ],
                stress_scenarios=[
                    StressScenario(
                        id="s1",
                        scenario="Peak traffic spikes 5x during holiday marketing campaign",
                        impact="HIGH",
                        affected_option="PostgreSQL",
                        readiness_delta=-12,
                        explanation="Unoptimized queries could exhaust connection pools under heavy load."
                    ),
                    StressScenario(
                        id="s2",
                        scenario="Engineering team budget cut by 30%",
                        impact="CRITICAL",
                        affected_option="Migrate to MongoDB",
                        readiness_delta=-20,
                        explanation="Migration project requires dedicated engineering bandwidth that would be unavailable."
                    )
                ]
            )
        else:
            # Generic structured analysis fallback
            return AIAnalysisOutput(
                summary=f"Audit analysis for '{decision_data.title}'. Stated options carry unverified assumptions and missing technical constraints that require verification.",
                facts=[
                    Fact(id="f1", statement=f"Decision options considered: {', '.join(decision_data.options)}", confidence=1.0, source="User Entry")
                ],
                assumptions=[
                    Assumption(id="a1", statement="Proposed options can be implemented within current schedule and budget.", risk_level="HIGH", impact="HIGH")
                ],
                claims=[
                    Claim(id="c1", statement="Selected option will deliver expected ROI without unforeseen dependencies.", verified=False, evidence_required="Feasibility study")
                ],
                unknowns=[
                    Unknown(id="u1", statement="Detailed long-term operational and maintenance costs.", criticality="HIGH")
                ],
                contradictions=[],
                risks=[
                    Risk(id="r1", category="Operational", description="Implementation timeline risk due to unverified dependencies.", severity="HIGH", likelihood="MEDIUM", confidence=0.8)
                ],
                missing_evidence=[
                    MissingEvidence(
                        id="m1",
                        title="Detailed Cost & Resource Audit",
                        importance="CRITICAL",
                        reason="Required to confirm that resource allocation matches project constraints.",
                        verification_action="Conduct line-item budget and resource availability review.",
                        decision_impact="High"
                    )
                ],
                verification_actions=[
                    VerificationAction(id="v1", title="Complete vendor & resource review", target_item="Resource Audit", priority="HIGH", completed=False)
                ],
                stress_scenarios=[
                    StressScenario(
                        id="s1",
                        scenario="Resource availability drops by 40%",
                        impact="HIGH",
                        affected_option=decision_data.options[0] if decision_data.options else "Option 1",
                        readiness_delta=-15,
                        explanation="Reduced capacity significantly delays execution stability."
                    )
                ]
            )

demo_provider = DemoProvider()
