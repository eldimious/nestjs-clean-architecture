import {
  Controller, Inject, Post, Body,
} from '@nestjs/common';
import { IAuthService } from '../../../../domain/auth/IAuthService';
import { CreateUserDto } from '../users/dto/request/CreateUserDto';
import { IUserResponseDto } from '../users/dto/response/IUserResponseDto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) { }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const res = await this.authService.login(email, password);
    return {
      token: res.token,
      user: res.user.toUserResponse(),
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<IUserResponseDto> {
    const user = await this.authService.register(createUserDto);
    return user.toUserResponse();
  }
}
