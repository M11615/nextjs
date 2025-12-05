#!/usr/bin/env python3

import os
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_ID: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
BASE_DIRECTORY: str = os.path.dirname(__file__)
CACHE_DIRECTORY: str = os.path.join(BASE_DIRECTORY, "./src/lib/.models")

def main() -> None:
  AutoTokenizer.from_pretrained(MODEL_ID, cache_dir=CACHE_DIRECTORY)
  AutoModelForCausalLM.from_pretrained(MODEL_ID, cache_dir=CACHE_DIRECTORY)

if __name__ == "__main__":
  main()
