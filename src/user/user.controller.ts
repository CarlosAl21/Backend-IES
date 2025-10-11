import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios (sin contraseña)', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @ApiParam({ name: 'id', description: 'ID del usuario (uuid)' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado (sin contraseña)', type: User })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiResponse({ status: 401, description: 'Contraseña actual incorrecta' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
