import { IsNotEmpty, IsOptional } from "class-validator";

export class RegisterDto {

  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  pw!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  field!: string;

  @IsNotEmpty()
  userKey: string;

  @IsOptional()
  profileImage!: string;
}