import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto{
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  // @Matches(/^([a-zA-Z]{10,})$/, {message: 'Name must have a-z and A-Z'})
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(14)
  // @Matches(/^([0-9]{9,})$/)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  locale: string;
}