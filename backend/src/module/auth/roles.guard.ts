import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum/role.enum';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

import { User } from 'src/common/types/users.types';

//check user's role
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //if no role required, let user use this api request by return true
    if (!requiredRoles) {
      return true;
    }

    //if role is required, check if the role of user matches the role required to acess to this api

    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    return requiredRoles.some((role) => role === user.role_id);
  }
}
