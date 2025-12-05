#!/usr/bin/env python3

import platform
import os
import sys
import subprocess
from typing import List

def get_python_executable() -> str:
  if platform.system() == "Windows":
    return os.path.join("./.venv/Scripts/python.exe")
  else:
    return os.path.join("./.venv/bin/python")

def run_python(python_executable: str, args: list[str]) -> int:
  process: subprocess.Popen[bytes] = subprocess.Popen([python_executable] + args, stdout=sys.stdout, stderr=sys.stderr)
  process.communicate()

  return process.returncode

def main() -> int:
  python_executable: str = get_python_executable()
  command_arguments: List[str] = sys.argv[1:]

  return run_python(python_executable, command_arguments)

if __name__ == "__main__":
  sys.exit(main())
