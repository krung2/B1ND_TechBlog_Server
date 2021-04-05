import { IsNotEmpty } from "class-validator";

export class AddPostDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  description: string;
}