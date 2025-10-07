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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: {
      name: string;
      lastname: string;
      username: string;
      email: string;
      phone: string;
      address: string;
      password: string;
      genere?: string;
      occupation?: string;
      monthly_income?: number;
    },
  ) {
    // Map incoming body to CreateUserDto shape expected by UserService.create
    return this.userService.create(body as any);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { error: 'Usuario o contraseña incorrectos' };
    }
    return this.authService.login(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    // jwt.strategy.validate returns { userId, username, isAdmin }
    await this.authService.logout(req.user.userId, token);
    return { message: 'Sesión cerrada correctamente' };
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  // --- Password reset endpoints ---
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const token = uuidv4();
    // If UserService implements saveResetToken, call it. Otherwise do nothing.
    if (typeof this.userService['saveResetToken'] === 'function') {
      const saved = await (this.userService as any).saveResetToken(
        email,
        token,
      );
      // If you later add a MailService, send the reset email here.
      if (saved && typeof (this as any).mailService === 'function') {
        // no-op: mailer not implemented in this project by default
      }
    }
    return { message: 'Si el usuario existe, se envió un correo de reseteo.' };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
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
