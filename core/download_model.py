#!/usr/bin/env python3

import os
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id: str = "openai-community/gpt2"
base_directory: str = os.path.dirname(__file__)
cache_directory: str = os.path.join(base_directory, "./src/lib/.models")

def main() -> None:
  AutoTokenizer.from_pretrained(model_id, cache_dir=cache_directory)
  AutoModelForCausalLM.from_pretrained(model_id, cache_dir=cache_directory)

if __name__ == "__main__":
  main()
