import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) : Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) : Promise<{access_token: string}>{
    return this.usersService.login(loginUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@GetUser() user: User) : Promise<User> {
    return this.usersService.getMe(user);
  }
}
