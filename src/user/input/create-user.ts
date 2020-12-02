import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUser {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

}
