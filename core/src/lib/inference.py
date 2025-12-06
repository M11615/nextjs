import os
import torch
from typing import Dict, List, Optional, Union
from transformers import AutoTokenizer, AutoModelForCausalLM, PreTrainedTokenizerBase, PreTrainedModel

base_directory: str = os.path.dirname(__file__)
repository_snapshot_directory: str = os.path.join(base_directory, "./.models/models--openai-community--gpt2/snapshots")
snapshot_hashes: List[str] = os.listdir(repository_snapshot_directory)
snapshot_paths: List[str] = [os.path.join(repository_snapshot_directory, snapshot_hash) for snapshot_hash in snapshot_hashes]
latest_snapshot_path: str = max(snapshot_paths, key=os.path.getmtime)
tokenizer: PreTrainedTokenizerBase = AutoTokenizer.from_pretrained(latest_snapshot_path, local_files_only=True)
model: PreTrainedModel = AutoModelForCausalLM.from_pretrained(latest_snapshot_path, local_files_only=True)
device: torch.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

if tokenizer.pad_token is None:
  if tokenizer.eos_token is not None:
    tokenizer.pad_token = tokenizer.eos_token
  else:
    tokenizer.pad_token = tokenizer.convert_ids_to_tokens(0)

def inference_process(
    input_text: str,
    max_new_tokens: int = 50,
    do_sample: bool = True,
    temperature: float = 0.9,
    top_k: int = 50,
    top_p: float = 0.95,
    num_return_sequences: int = 1,
    seed: Optional[int] = None,
    return_all: bool = False,
) -> Union[str, List[str]]:
  if seed is not None:
    torch.manual_seed(seed)
    if torch.cuda.is_available():
      torch.cuda.manual_seed_all(seed)
  maximum_model_length: Optional[int] = getattr(tokenizer, "model_max_length", None)
  encoded_input: Dict[str, torch.Tensor] = tokenizer(
    input_text,
    return_tensors="pt",
    truncation=True,
    max_length=maximum_model_length
  )
  input_tensor_ids: torch.Tensor = encoded_input["input_ids"].to(device)
  attention_mask_tensor: Optional[torch.Tensor] = encoded_input.get("attention_mask", None)
  if attention_mask_tensor is not None:
    attention_mask_tensor = attention_mask_tensor.to(device)
  generation_arguments: Dict[str, Union[torch.Tensor, int, float, bool]] = dict(
    input_ids=input_tensor_ids,
    attention_mask=attention_mask_tensor,
    do_sample=do_sample,
    max_new_tokens=max_new_tokens,
    temperature=temperature,
    top_k=top_k if top_k > 0 else None,
    top_p=top_p if 0.0 < top_p <= 1.0 else None,
    num_return_sequences=num_return_sequences,
    pad_token_id=tokenizer.pad_token_id,
    eos_token_id=getattr(tokenizer, "eos_token_id", None),
  )
  generation_arguments = {
    key: value for key, value in generation_arguments.items()
    if value is not None
  }
  with torch.no_grad():
    generated_outputs: torch.Tensor = model.generate(**generation_arguments)
  decoded_results: List[str] = []
  for output_tensor_ids in generated_outputs:
    decoded_text: str = tokenizer.decode(
      output_tensor_ids,
      skip_special_tokens=True,
      clean_up_tokenization_spaces=True
    )
    decoded_results.append(decoded_text)
  if return_all:
    return decoded_results
  else:
    return decoded_results[0]
