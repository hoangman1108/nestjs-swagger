import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBloomBoxDto {
  @ApiProperty()
  @IsNotEmpty()
  type: string;
  
  @ApiProperty()
  @IsNotEmpty()
  number: number;

}