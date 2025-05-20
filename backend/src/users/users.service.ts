import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly authService: AuthService) {}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
          throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
      return createdUser.save();
    }

    async findByEmail(email:string) : Promise<User | null> {
      return this.userModel.findOne({email}).exec();
    }

    async login(loginUserDto: LoginUserDto): Promise<{access_token: string}> {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.authService.generateToken(user);

      return {access_token: token};
    }

    async getMe(user: User) : Promise<User> {
      return await this.userModel.findById(user._id).select('-password -createdAt -updatedAt');
    }

    async getFavoriteTeams(user: User): Promise<number[]> {
      const existingUser = await this.userModel.findById(user._id);
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      return existingUser.favoriteTeams;
    }

    async addFavoriteTeam(user: User, teamId: number): Promise<{favoriteTeams: number[]}> {
      const existingUser = await this.userModel.findById(user);
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      if (existingUser.favoriteTeams.includes(teamId)) {
        throw new ConflictException('Team already exists on favorites');
      }
      if (existingUser.favoriteTeams.length >= 5) {
        throw new BadRequestException('You can only have 5 favorite teams');
      }
      existingUser.favoriteTeams.push(teamId);
      existingUser.save();

      return {favoriteTeams: existingUser.favoriteTeams};
    }

    async removeFavoriteTeam(user: User, teamId: number): Promise<{favoriteTeams: number[]}> {
        const existingUser = await this.userModel.findById(user._id);
        if (!existingUser) {
          throw new NotFoundException('User not found');
        }

        const teamIndex = existingUser.favoriteTeams.indexOf(teamId);
        if (teamIndex === -1) {
          throw new NotFoundException('Team not found on favorites');
        }
        existingUser.favoriteTeams.splice(teamIndex, 1);
        existingUser.save();

        return {favoriteTeams: existingUser.favoriteTeams};
    }
}
