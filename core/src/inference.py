# Load model directly
import os
from typing import List, Dict
from transformers import AutoTokenizer, AutoModelForCausalLM, PreTrainedTokenizerBase, PreTrainedModel
from torch import Tensor

BASE_DIRECTORY: str = os.path.dirname(__file__)
MODEL_ID: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
MODEL_PATH: str = os.path.join(BASE_DIRECTORY, "../.models")
tokenizer: PreTrainedTokenizerBase = AutoTokenizer.from_pretrained(MODEL_ID, cache_dir=MODEL_PATH)
model: PreTrainedModel = AutoModelForCausalLM.from_pretrained(MODEL_ID, cache_dir=MODEL_PATH)

def inference(input: str) -> str:
  messages: List[Dict[str, str]] = [
    {"role": "user", "content": input}
  ]
  inputs: Dict[str, Tensor] = tokenizer.apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt"
  ).to(model.device)
  outputs: Tensor = model.generate(**inputs, max_new_tokens=512)

  return tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:])
