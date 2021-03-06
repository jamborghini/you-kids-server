import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user';
import { Role } from 'src/auth/decorator/roles.';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get(Role, context.getHandler());

    if (null == role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return this.userService.findOne(user.id).then(user => {
      return user.role >= role;
    });
  }

}
