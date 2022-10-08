import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './CreatePostDto';

export class CreateUserPostDto extends CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'tw',
  })
  // @ts-ignore
    userId: string;
}
