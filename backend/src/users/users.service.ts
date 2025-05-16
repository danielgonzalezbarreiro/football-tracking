import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
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
}
