import {
  Controller, Inject, Get, UseGuards, Req,
} from '@nestjs/common';
import { IUserResponseDto } from './dto/response/IUserResponseDto';
import { IUsersService } from '../../../../domain/users/IUsersService';
import { JwtAuthGuard } from '../../middleware/JwtStrategy';
import {GetUserQueryDto} from "./dto/request/GetUserQueryDto";

@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUsersService') private readonly usersService: IUsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any): Promise<IUserResponseDto> {
    const query = new GetUserQueryDto();
    query.userId = req.user.userId;
    const newUser = await this.usersService.getUser(query);
    return newUser.toUserResponse();
  }
}
