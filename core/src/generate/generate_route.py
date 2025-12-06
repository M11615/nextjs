import asyncio
from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from src.generate.request.user_generate_request import UserGenerateRequest
from src.lib.inference import inference_process
from src.lib.inference_process_runner import ProcessInferenceRunner

generate_router: APIRouter = APIRouter()
runner: ProcessInferenceRunner = ProcessInferenceRunner(inference_process)

@generate_router.post("/v1/generate/user_generate")
async def user_generate(request: Request, requestBody: UserGenerateRequest) -> StreamingResponse:
  async def stream_generator():
    output: str = await runner.run(
      request,
      requestBody.input_text,
      max_new_tokens=256,
      do_sample=True,
      temperature=0.7,
      top_k=50,
      top_p=0.95,
      num_return_sequences=1,
      seed=None,
      return_all=False
    )
    for ch in output:
      yield ch
      await asyncio.sleep(0.01)

  return StreamingResponse(content=stream_generator(), media_type="text/plain; charset=utf-8")
