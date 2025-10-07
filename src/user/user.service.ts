import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private validarCedulaEcuador(cedula: string): boolean {
    if (!/^\d{10}$/.test(cedula)) return false;
    const digits = cedula.split('').map(Number);
    const provinceCode = parseInt(cedula.substring(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) return false;
    const thirdDigit = digits[2];
    if (thirdDigit > 6) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let value = digits[i];
      if (i % 2 === 0) {
        value *= 2;
        if (value > 9) value -= 9;
      }
      sum += value;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === digits[9];
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validarTelefonoEcuador(telefono: string): boolean {
    // Formato para Ecuador:
    // Móviles: empiezan con 09 y tienen 10 dígitos
    // Convencionales: empiezan con 02, 03, 04, etc. y tienen también 9 dígitos
    const telefonoRegex = /^(09\d{8}|0[2-7]\d{7})$/;
    return telefonoRegex.test(telefono);
  }

  async validateUser(email: string, pass: string): Promise<User|any> {
    const user = await this.userRepository.findOne({ where: { email: email} });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async saveResetToken(email: string, token: string) {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) return false;
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de validez
  await this.userRepository.save(user);
  return true;
}

async resetPasswordWithToken(token: string, newPassword: string) {
  const user = await this.userRepository.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: MoreThan(new Date()),
    },
  });
  if (!user) return false;
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await this.userRepository.save(user);
  return true;
}

  async create(createUserDto: CreateUserDto) {
    try {
      if (!this.validarCedulaEcuador(createUserDto.cedula)) {
        throw new BadRequestException('La cédula no es válida');
      }

      if (!this.validarEmail(createUserDto.email)) {
        throw new BadRequestException('El email no es válido');
      }
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new ConflictException('El email ya está en uso');
      }
      if (createUserDto.phone && !this.validarTelefonoEcuador(createUserDto.phone)) {
        throw new BadRequestException('El teléfono no es válido');
      }
      const nuevoUsuario = this.userRepository.create(createUserDto);
      return await this.userRepository.save(nuevoUsuario);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      // Si ya es una excepción de Nest, relánzala
      if (error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async findAll() {
    const user = await this.userRepository.find();
    return user.map(({ password, ...rest}) => rest); // Excluir la contraseña del resultado;
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const { password, ...rest } = user;
      return rest; // Excluir la contraseña del resultado;
    } catch (error) {
      console.error('Error al encontrar el usuario:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al encontrar el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ idUser: id });
      if (!user) throw new NotFoundException('Usuario no encontrado');

      if (updateUserDto.email && !this.validarEmail(updateUserDto.email)) {
        throw new BadRequestException('El email no es válido');
      }

      if (updateUserDto.phone && !this.validarTelefonoEcuador(updateUserDto.phone)) {
        throw new BadRequestException('El teléfono no es válido');
      }

      // Preparar datos para actualizar, excluyendo currentPassword
      let updateData: any = { ...updateUserDto };
      delete updateData.currentPassword; // Remover currentPassword de los datos de actualización

      if (updateUserDto.password) {
        if (!updateUserDto.currentPassword) {
          throw new BadRequestException('La contraseña actual es requerida');
        }

        const isPasswordValid = await bcrypt.compare(
          updateUserDto.currentPassword,
          user.password,
        );
        if (!isPasswordValid) {
          throw new UnauthorizedException('Contraseña actual incorrecta');
        }

        // Hashear la nueva contraseña
        updateData.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Realizar la actualización en la base de datos
      await this.userRepository.update(id, updateData);
      
      // Obtener el usuario actualizado para retornarlo (sin la contraseña)
      const usuarioActualizado = await this.userRepository.findOne({ 
        where: { idUser: id }
      });

      if (!usuarioActualizado) {
        throw new NotFoundException('Usuario actualizado no encontrado');
      }
      const { password, ...rest } = usuarioActualizado;
      return rest;

    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ idUser: id });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      user.isActive = false;
      await this.userRepository.save(user);
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}

