import { IsNotEmpty, IsOptional } from "class-validator";

export class AddPostDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  category: string;
}