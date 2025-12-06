import asyncio
from typing import Any, List, Self, Callable, Union
from multiprocessing import Process
from multiprocessing.connection import Connection
from fastapi import Request

class ProcessInferenceRunner:
  def __init__(self: Self, inference_function: Callable[..., Union[str, List[str]]], **default_keyword_arguments: Any) -> None:
    self.inference_fn = inference_function
    self.default_kwargs = default_keyword_arguments

  def _worker(self: Self, connection: Connection, input_text: str, **keyword_arguments: Any) -> None:
    try:
      all_keyword_arguments = {**self.default_kwargs, **keyword_arguments, "input_text": input_text}
      result: Union[str, List[str]] = self.inference_fn(**all_keyword_arguments)
      result_to_send: str = None
      if isinstance(result, list):
        result_to_send = result[0] if result else ""
      else:
        result_to_send = result
      connection.send(result_to_send)
    except Exception as e:
      connection.send(e)
    finally:
      connection.close()

  async def run(self: Self, request: Request, input_text: str, **keyword_arguments: Any) -> str:
    from multiprocessing import Pipe
    parent_connection: Connection
    child_connection: Connection
    parent_connection, child_connection = Pipe()
    process: Process = Process(target=self._worker, args=(child_connection, input_text), kwargs=keyword_arguments)
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
