import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum/role.enum';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/types/users.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();

    // console.log(requiredRoles);

    // console.log({ user });

    const req = context.switchToHttp().getRequest();
    const user: Partial<User> = req.user;

    // return requiredRoles.some((role) => user.role === role);
    return requiredRoles.some((role) => role === user.role_id);
  }
}
