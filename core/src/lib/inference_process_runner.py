import asyncio
from typing import Self, Callable
from multiprocessing import Process, Pipe
from multiprocessing.connection import Connection
from fastapi import Request

class ProcessInferenceRunner:
  def __init__(self: Self, inference_function: Callable[[str], str]) -> None:
    self.inference_fn = inference_function

  def _worker(self: Self, input_text: str, connection: Connection) -> None:
    try:
      result: str = self.inference_fn(input_text)
      connection.send(result)
    except Exception as e:
      connection.send(e)
    finally:
      connection.close()

  async def run(self: Self, input_text: str, request: Request) -> str:
    parent_connection: Connection
    child_connection: Connection
    parent_connection, child_connection = Pipe()
    process: Process = Process(target=self._worker, args=(input_text, child_connection))
    process.start()
    try:
      while True:
        if await request.is_disconnected():
          process.terminate()
          process.join()
          raise asyncio.CancelledError()
        if parent_connection.poll(0.1):
          break
        await asyncio.sleep(0.01)
      result: str | Exception = parent_connection.recv()
      if isinstance(result, Exception):
        raise result

      return result
    finally:
      if process.is_alive():
          process.terminate()
          process.join()
