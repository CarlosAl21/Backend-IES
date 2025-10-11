import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  private activeSessions = new Map<string, string[]>(); 

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.startTokenCleanup();
  }

  // Función para iniciar la limpieza automática
  private startTokenCleanup() {
    setInterval(() => {
      // Recorremos el mapa y limpiamos los tokens expirados
      for (const [id_usuario, tokens] of this.activeSessions.entries()) {
        const validTokens = tokens.filter(token => {
          try {
            this.jwtService.verify(token); // Verificamos si el token está expirado
            return true; // Si el token es válido, lo mantenemos
          } catch (e) {
            return false; // Si el token expiró, lo eliminamos
          }
        });

        if (validTokens.length > 0) {
          this.activeSessions.set(id_usuario, validTokens);
        } else {
          this.activeSessions.delete(id_usuario); // Eliminar la entrada si no hay tokens válidos
        }
      }
    }, 3600000); // Cada 1 hora (3600000 ms)
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return null;

      const match = await bcrypt.compare(pass, user.password);
      if (!match) return null;

      const { password, ...result } = user as any;
      return result;
    } catch (error) {
      console.error('Error al validar usuario:', error);
      throw new InternalServerErrorException('Error al validar usuario');
    }
  }

  private mapRole(entityRole?: string): 'SuperAdmin' | 'Admin' | 'User' {
    if (!entityRole) return 'User';
    switch (entityRole) {
      case 'SuperAdministrador':
      case 'SuperAdmin':
        return 'SuperAdmin';
      case 'Administrador':
      case 'Admin':
        return 'Admin';
      case 'Usuario':
      case 'Revisor':
      default:
        return 'User';
    }
  }

  async login(user: any) {
    try {
      const payload = {
        username: user.username ?? user.email ?? user.name,
        sub: user.idUser,
        // incluir rol estandarizado en el token
        role: this.mapRole(user.role),
      };
      const token = this.jwtService.sign(payload);
      // Guardar sesión en la lista de sesiones activas
      if (!this.activeSessions.has(user.idUser)) {
        this.activeSessions.set(user.idUser, []);
      }
      this.activeSessions.get(user.idUser)?.push(token);

      return { access_token: token };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new InternalServerErrorException('Error al iniciar sesión');
    }
  }
    
  async logout(id: string, token: string) {
    try {
      const tokens = this.activeSessions.get(id);
      if (tokens) {
        this.activeSessions.set(id, tokens.filter(t => t !== token));
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw new InternalServerErrorException('Error al cerrar sesión');
    }
  }

  getActiveSessions() {
    return this.activeSessions;
  }
}
