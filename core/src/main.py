import asyncio
from typing import Dict
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi import FastAPI, Request
from src.inference import inference

app: FastAPI = FastAPI()

@app.get("/v1/read_root")
async def read_root() -> Dict[str, str]:
  return {"Hello": "World"}

class UserGenerateRequest(BaseModel):
  input: str

@app.post("/v1/user_generate")
async def user_generate(request: Request, requestBody: UserGenerateRequest) -> StreamingResponse:
  async def stream_generator():
    output: str = inference(requestBody.input)
    for ch in output:
      if await request.is_disconnected():
        break
      yield ch
      await asyncio.sleep(0.01)

  return StreamingResponse(stream_generator(), media_type="text/plain")
