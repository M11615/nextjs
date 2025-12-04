import { IsNotEmpty, IsString } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';

export class UserGenerateRequest {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  inputText: string;
}
