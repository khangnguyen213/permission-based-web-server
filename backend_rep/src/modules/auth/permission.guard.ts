import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUserData } from 'src/common/interfaces';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowSelf = this.reflector.get<boolean>(
      'allow-self',
      context.getHandler(),
    );

    if (allowSelf) {
      const request: RequestWithUserData = context.switchToHttp().getRequest();
      if (request.params.userId === request.user.id) {
        return true;
      }
    }

    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    if (!permission) {
      return false;
    }

    const request: RequestWithUserData = context.switchToHttp().getRequest();
    const user = request.user;

    return user.role?.permissions?.some((p) => permission === p.name);
  }
}
