import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUser } from 'src/user/input/create-user';
import { User } from 'src/user/entity/user';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post('register')
  async register(@Body() body: CreateUser): Promise<User> {
    return await User.create(body).save();
  }

  @Post('login')
  async login(@Body() body: User): Promise<{ token }> {
    return this.userService.login(body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return await this.userService.deleteOne(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await User.find();
  }


  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

}
