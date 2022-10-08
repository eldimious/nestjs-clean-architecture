import {
  Controller, Post, Body, Inject, Get, Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response/UserResponseDto';
import { CreateUserDto } from './dto/request/CreateUserDto';
import { IAuthService } from '../../../../domain/auth/IAuthService';
import { IUsersService } from '../../../../domain/users/IUsersService';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('IUsersService') private readonly usersService: IUsersService,
  ) { }

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
    const newUser = await this.authService.register(createUserDto);
    return newUser.toUserResponse();
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Get a user',
  })
  @ApiCreatedResponse({ description: 'Get user.', type: UserResponseDto })
  // @ApiBadRequestResponse({
  //   description: 'The request object doesn`t match the expected one',
  //   type: BadRequestError,
  // })
  // @ApiUnprocessableEntityResponse({
  //   description: 'Validation error while creating user',
  //   type: UnprocessableEntityError,
  // })
  async getUser(@Param() params: any): Promise<UserResponseDto> {
    const newUser = await this.usersService.getUser({ userId: params.userId });
    return newUser.toUserResponse();
  }
}
