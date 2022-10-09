import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The image url of the post',
    example: 'https://media.xxxxxxxx.com/',
  })
    imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the post',
    example: 'This post refers to.',
  })
    description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The publisher of the post',
    example: 'eldimious',
  })
    publisher: string;
}
