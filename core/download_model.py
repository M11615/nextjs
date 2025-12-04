import os
from transformers import AutoTokenizer, AutoModelForCausalLM, PreTrainedTokenizerBase, PreTrainedModel

MODEL_ID: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
BASE_DIRECTORY: str = os.path.dirname(__file__)
CACHE_DIRECTORY: str = os.path.join(BASE_DIRECTORY, "./.models")
tokenizer: PreTrainedTokenizerBase = AutoTokenizer.from_pretrained(MODEL_ID, cache_dir=CACHE_DIRECTORY)
model: PreTrainedModel = AutoModelForCausalLM.from_pretrained(MODEL_ID, cache_dir=CACHE_DIRECTORY)
