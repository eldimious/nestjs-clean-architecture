import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './CreatePostDto';

export class CreateUserPostDto extends CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The userId of the user',
    example: '6341785a4eabfd90c2055d16',
  })
    userId: string;
}
