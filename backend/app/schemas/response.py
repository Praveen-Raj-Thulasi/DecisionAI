from typing import Generic, Optional, TypeVar, Any
from pydantic import BaseModel

T = TypeVar("T")

class APIErrorDetail(BaseModel):
    code: str
    message: str

class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    error: Optional[APIErrorDetail] = None
