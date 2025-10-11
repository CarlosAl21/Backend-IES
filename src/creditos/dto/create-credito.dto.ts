import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCreditoDto {
  @ApiProperty({ example: 'Crédito Personal', description: 'Nombre del crédito' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 12.5, description: 'TNA (porcentaje o decimal)' })
  @IsNotEmpty()
  tna: number;

  @ApiProperty({ example: 13.0, description: 'TEA (porcentaje o decimal)' })
  @IsNotEmpty()
  tea: number;

  @ApiProperty({ example: { seguroVida: true }, description: 'Seguros (JSON)' })
  @IsNotEmpty()
  seguros: any;

  @ApiProperty({ example: 6, description: 'Meses mínimos' })
  @IsNotEmpty()
  monthsMin: number;

  @ApiProperty({ example: 60, description: 'Meses máximos' })
  @IsNotEmpty()
  monthsMax: number;

  @ApiProperty({ example: 100, description: 'Monto mínimo' })
  @IsNotEmpty()
  amountMin: number;

  @ApiProperty({ example: 10000, description: 'Monto máximo' })
  @IsNotEmpty()
  amountMax: number;

  @ApiProperty({ example: 'uuid-institucion', description: 'ID de la institución' })
  @IsString()
  @IsNotEmpty()
  idInstitucionFinanciera: string;

  @ApiPropertyOptional({ example: true, description: 'Know amount flag' })
  @IsOptional()
  knowAmount: boolean;
}
