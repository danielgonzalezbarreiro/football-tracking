import { Body, Controller, Get, Post, Delete,Param  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddFavoriteTeamDto } from './dto/add-favorite-team.dto';


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

  @Get('favorite-teams')
  @UseGuards(AuthGuard('jwt'))
  async getFavoriteTeams(@GetUser() user: User) {
    return this.usersService.getFavoriteTeams(user);
  }

  @Post('favorite-teams')
  @UseGuards(AuthGuard('jwt'))
  async addFavoriteTeam(@GetUser() user: User, @Body() addFavoriteTeamDto: AddFavoriteTeamDto) {
    return this.usersService.addFavoriteTeam(user, addFavoriteTeamDto.teamId);
  }

  @Delete('favorite-teams/:teamId')
  @UseGuards(AuthGuard('jwt'))
  async removeFavoriteTeam(@GetUser() user: User, @Param('teamId') teamId: number) {
    return this.usersService.removeFavoriteTeam(user, teamId);
  }
}
