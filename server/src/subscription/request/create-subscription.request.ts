import { IsEmail } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateSubscriptionRequest {
  @IsEmail()
  @Transform(({ value }: TransformFnParams) => value.trim().toLowerCase())
  email: string;
}
