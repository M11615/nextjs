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

def run_python(python_executable: str, args: List[str]) -> int:
  process: subprocess.Popen[bytes] = subprocess.Popen([python_executable] + args, stdout=sys.stdout, stderr=sys.stderr)
  process.communicate()

  return process.returncode

def main() -> int:
  return run_python(get_python_executable(), sys.argv[1:])

if __name__ == "__main__":
  sys.exit(main())
