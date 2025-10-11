import { PartialType } from '@nestjs/swagger'; // usar swagger PartialType para heredar ApiProperty
import { CreateUserDto } from './create-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'ID del usuario (uuid)' })
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @ApiPropertyOptional({ description: 'Contraseña actual (requerida si cambia password)' })
  @IsString()
  @IsNotEmpty()
  currentPassword?: string;
}
