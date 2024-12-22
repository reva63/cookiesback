import { IsString, IsEmail } from 'class-validator';

export class CreateStackDto {
  @IsString()
  stack: string;

  @IsString()
  level: string;

  @IsEmail()
  email: string;
}
