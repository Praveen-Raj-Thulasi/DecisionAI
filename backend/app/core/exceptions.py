class DecisionShieldException(Exception):
    """Base exception for DecisionShield backend."""
    def __init__(self, message: str, code: str = "INTERNAL_ERROR", status_code: int = 500):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)

class DecisionNotFoundException(DecisionShieldException):
    def __init__(self, decision_id: str):
        super().__init__(
            message=f"Decision with ID '{decision_id}' was not found.",
            code="DECISION_NOT_FOUND",
            status_code=404
        )

class AIModelException(DecisionShieldException):
    def __init__(self, message: str):
        super().__init__(
            message=message,
            code="AI_MODEL_UNAVAILABLE",
            status_code=503
        )

class ValidationException(DecisionShieldException):
    def __init__(self, message: str):
        super().__init__(
            message=message,
            code="INVALID_REQUEST",
            status_code=400
        )
