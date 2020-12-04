import { BadRequestException, Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUser } from 'src/user/input/create-user';
import { User } from 'src/user/entity/user';
import { paginate, Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Role } from 'src/user/enum/role';
import { Id } from 'src/shared/decorator/id';

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
  async deleteUser(@Id() id: number): Promise<User> {
    return await this.userService.deleteOne(id);
  }

  @Get()
  async getUsersPaginated(@Paginate() query: PaginateQuery, @Query('searchBy') searchBy?: string): Promise<Paginated<User>> {

    if (
      searchBy === 'role' &&
      /\D+/ig.test(query.search) ||
      parseInt(query.search) > Role.Root ||
      parseInt(query.search) < Role.User
    ) {
      throw new BadRequestException('An invalid role search was provided.');
    }

    return paginate(query, User.getRepository(), {
      sortableColumns: ['id', 'username', 'role', 'createdAt'],
      searchableColumns: searchBy === 'username' || searchBy === 'role'
        ? [searchBy] : ['username', 'role'],
      defaultLimit: 10,
    });
  }

  // @MinRole(1)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  async getUsers(): Promise<User[]> {
    return User.find();
  }


  @Get(':id')
  async getUser(@Id() id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

}
