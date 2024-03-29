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

  @IsOptional()
  profileImage!: string;

  @IsOptional()
  userKey: string;
}