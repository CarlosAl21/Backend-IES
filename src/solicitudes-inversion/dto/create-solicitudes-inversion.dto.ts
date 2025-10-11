import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSolicitudesInversionDto {
  @ApiProperty({ example: 1000, description: 'Monto a invertir' })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 12, description: 'Plazo en meses' })
  @IsNotEmpty()
  plazo: number;

  @ApiProperty({ example: 'Ahorro', description: 'Motivo' })
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @ApiProperty({ example: 'Descripción', description: 'Descripción' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 'Cocinero', description: 'Profesión' })
  @IsString()
  @IsNotEmpty()
  profesion: string;

  @ApiProperty({ example: '1200', description: 'Ingresos mensuales' })
  @IsString()
  @IsNotEmpty()
  ingresosMensuales: string;

  @ApiPropertyOptional({ description: 'Estado', example: 'Pendiente' })
  @IsOptional()
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';

  @ApiProperty({ example: 'uuid-user', description: 'ID del usuario' })
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @ApiProperty({ example: 'uuid-institucion', description: 'ID de la institución' })
  @IsString()
  @IsNotEmpty()
  idInstitucion: string;

  @ApiProperty({ example: 'uuid-inversion', description: 'ID de la inversión' })
  @IsString()
  @IsNotEmpty()
  idInversion: string;
}
