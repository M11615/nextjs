from pydantic import BaseModel, Field

class UserGenerateRequest(BaseModel):
  input_text: str = Field(..., alias="inputText")
