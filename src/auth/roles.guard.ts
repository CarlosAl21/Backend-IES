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

    // Obtener rol desde el token (ya mapeado por AuthService) o hacer fallback desde posibles valores en español
    const tokenRole: string | undefined = user.role;
    const isAdminFlag: boolean = !!user.isAdmin;

    // Normalizar a AppRole
    const normalizeToAppRole = (r?: string): AppRole => {
      if (!r) return isAdminFlag ? 'Admin' : 'User';
      switch (r) {
        case 'SuperAdmin':
        case 'SuperAdministrador':
        case 'SuperAdmininstrador': // por si hay typo histórico
          return 'SuperAdmin';
        case 'Admin':
        case 'Administrador':
          return 'Admin';
        case 'User':
        case 'Usuario':
        case 'Revisor':
        default:
          return 'User';
      }
    };

    const userRole = normalizeToAppRole(tokenRole);

    const hasRole = requiredRoles.some(role => role === userRole);
    if (!hasRole) throw new ForbiddenException('Insufficient role');
    return true;
  }
}