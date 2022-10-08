/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'Dimos',
  })
    // @ts-ignore
    imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'Dimos',
  })
    // @ts-ignore
    description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'tw',
  })
    // @ts-ignore
    publisher: string;
}
