import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
