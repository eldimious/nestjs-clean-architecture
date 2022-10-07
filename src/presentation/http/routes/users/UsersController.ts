import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from "./dto/response/UserResponseDto";
import { CreateUserDto } from "./dto/request/CreateUserDto";
import {UsersService} from "../../../../domain/users/UsersService";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  @ApiCreatedResponse({ description: 'User created.', type: UserResponseDto })
  // @ApiBadRequestResponse({
  //   description: 'The request object doesn`t match the expected one',
  //   type: BadRequestError,
  // })
  // @ApiUnprocessableEntityResponse({
  //   description: 'Validation error while creating user',
  //   type: UnprocessableEntityError,
  // })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser.toUserResponse();
  }
}