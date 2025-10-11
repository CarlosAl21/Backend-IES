import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Juan', description: 'Primer nombre' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Carlos', description: 'Segundo nombre' })
  @IsString()
  @IsNotEmpty()
  secondName: string;

  @ApiProperty({ example: 'González', description: 'Segundo apellido' })
  @IsString()
  @IsNotEmpty()
  secondLastName: string;

  @ApiProperty({ example: '0999999999', description: 'Teléfono móvil' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '022222222', description: 'Teléfono de casa' })
  @IsString()
  @IsNotEmpty()
  homePhone: string;

  @ApiProperty({ example: '0102030405', description: 'Cédula (Ecuador)' })
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @ApiProperty({ example: 'usuario@example.com', description: 'Correo electrónico' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: 'uuid-institucion', description: 'ID de la institución (opcional)' })
  @IsString()
  @IsOptional()
  idInstitucionFinanciera: string;
}
