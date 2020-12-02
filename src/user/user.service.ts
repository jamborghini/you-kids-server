import { ForbiddenException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from 'src/user/entity/user';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UserService {

  constructor(private readonly authService: AuthService) {
  }

  async login(user: User): Promise<{ token: string }> {
    return this.validateUser(user.username, user.password).then(user => {
      return this.authService.generateJwt(user).then(jwt => {
        return { token: jwt };
      });
    });
  }

  async validateUser(username: string, password: string): Promise<User> {
    return this.findByUsername(username).then(user => {
      return this.authService.comparePasswords(password, user.password).then(match => {
        if (match) {
          return user;
        } else {
          throw new ForbiddenException();
        }
      });
    });
  }


  async findByUsername(@Param('username') username: string): Promise<User> {
    const user = await User.findOne({ username });

    if (null == user) {
      throw new ForbiddenException();
    }

    return user;
  }


  async deleteOne(@Param('id') id: number): Promise<User> {
    const user = await User.findOne(id);

    if (null == user) {
      throw new NotFoundException();
    }

    await user.remove();
    return user;
  }

  async findOne(@Param('id') id: number): Promise<User> {
    return await User.findOne({ id });
  }


}
