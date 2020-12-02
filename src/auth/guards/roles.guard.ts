import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<number>('role', context.getHandler());

    if (null == role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return this.userService.findOne(user.id).then(user => {
      const hasRole = () => user.role >= role;
      let hasPermissions: boolean = false;
      console.log({ required: role, userRole: user.role });


      if (hasRole()) {
        hasPermissions = true;
      }
      return hasPermissions;
    });
  }

}
