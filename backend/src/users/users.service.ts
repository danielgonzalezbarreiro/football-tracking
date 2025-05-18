import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { getConfigToken } from '@nestjs/config';

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
}
