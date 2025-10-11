import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// añadido swagger + dtos
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: User })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Token de acceso (access_token)', schema: { example: { access_token: '...' } } })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { error: 'Usuario o contraseña incorrectos' };
    }
    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión (revocar token localmente)' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada correctamente' })
  async logout(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    await this.authService.logout(req.user.userId, token);
    return { message: 'Sesión cerrada correctamente' };
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  getProfile(@Request() req) {
    return req.user;
  }

  // --- Password reset endpoints ---
  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar reseteo de contraseña (genera token)' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Si el usuario existe, se envió un correo de reseteo (simulado)' })
  async forgotPassword(@Body('email') email: string) {
    const token = uuidv4();
    if (typeof this.userService['saveResetToken'] === 'function') {
      const saved = await (this.userService as any).saveResetToken(
        email,
        token,
      );
      if (saved && typeof (this as any).mailService === 'function') {
        // no-op: mailer no implementado
      }
    }
    return { message: 'Si el usuario existe, se envió un correo de reseteo.' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Resetear contraseña usando token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Token inválido o expirado' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    if (typeof this.userService['resetPasswordWithToken'] !== 'function') {
      throw new BadRequestException('Funcionalidad de reseteo no implementada');
    }
    const result = await (this.userService as any).resetPasswordWithToken(
      body.token,
      body.newPassword,
    );
    if (!result) throw new BadRequestException('Token inválido o expirado');
    return { message: 'Contraseña actualizada correctamente.' };
  }
}
