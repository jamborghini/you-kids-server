import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUser } from 'src/user/input/create-user';
import { User } from 'src/user/entity/user';
import { MinRole } from 'src/auth/decorator/roles.';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  @MinRole(1)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return await User.find();
  }


  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

}
