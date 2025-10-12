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
      // si no viene rol explícito, usar flag isAdminFlag como fallback
      if (!r) return isAdminFlag ? 'Administrador' : 'Usuario';

      const v = String(r).trim().toLowerCase();

      // coincidencias exactas y sinónimos habituales
      if (['superadmin', 'super-admin', 'super administrador', 'superadministrador', 'superadmininstrador', 'super admin'].includes(v)) {
        return 'SuperAdministrador';
      }
      if (['admin', 'administrador', 'administration', 'administrator'].includes(v)) {
        return 'Administrador';
      }
      if (['revisor', 'reviewer', 'rev'].includes(v)) {
        return 'Revisor';
      }
      if (['user', 'usuario', 'usr'].includes(v)) {
        return 'Usuario';
      }

      // fallback por palabras clave dentro del string (maneja casos como "ROLE_SUPERADMIN" o "Rol:Administrador")
      if (v.includes('super')) return 'SuperAdministrador';
      if (v.includes('admin')) return 'Administrador';
      if (v.includes('revisor') || v.includes('review')) return 'Revisor';
      if (v.includes('user') || v.includes('usuario')) return 'Usuario';

      // último recurso: usar isAdminFlag o usuario por defecto
      return isAdminFlag ? 'Administrador' : 'Usuario';
    };

    const userRole = normalizeToAppRole(tokenRole);

    const hasRole = requiredRoles.some(role => role === userRole);
    if (!hasRole) throw new ForbiddenException('Insufficient role');
    return true;
  }
}