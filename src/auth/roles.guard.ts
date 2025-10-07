import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLES_KEY, AppRole } from './roles.decorator';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // primero ejecutar validación JWT (Auth)
    const authResult = (await super.canActivate(context)) as boolean;
    if (!authResult) return false;

    // leer roles requeridos desde metadata
    const requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true; // sin roles requeridos => permitir

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;

    // construir lista de roles del usuario según la entidad User
    const userRoles: AppRole[] = [];
    if (user.isSuperAdmin) userRoles.push('SuperAdmin');
    if (user.isAdmin) userRoles.push('Admin');
    // todos los usuarios autenticados son al menos 'User'
    userRoles.push('User');

    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRole) throw new ForbiddenException('Insufficient role');
    return true;
  }
}