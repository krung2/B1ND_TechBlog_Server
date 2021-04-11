import { IsNotEmpty } from "class-validator";

export class PermissionDto {

  @IsNotEmpty()
  token!: string;

}