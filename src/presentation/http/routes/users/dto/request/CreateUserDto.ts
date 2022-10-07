import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'Dimos',
  })
    // @ts-ignore
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The lastName of the user',
    example: 'Botsaris',
  })
  // @ts-ignore
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user',
    example: 'eldimious',
  })
    // @ts-ignore
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The unique email of the user',
    example: 'test@gmail.com',
  })
    // @ts-ignore
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the user',
    example: 'test',
  })
    // @ts-ignore
  password: string;
}