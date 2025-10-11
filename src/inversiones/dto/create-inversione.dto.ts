import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInversioneDto {
  @ApiProperty({ example: 'Plazo Fijo 6 meses', description: 'Nombre de la inversión' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1, description: 'Meses mínimos' })
  @IsNumber()
  @IsNotEmpty()
  monthsMin: number;

  @ApiProperty({ example: 12, description: 'Meses máximos' })
  @IsNumber()
  @IsNotEmpty()
  monthsMax: number;

  @ApiProperty({ example: 100, description: 'Monto mínimo' })
  @IsNumber()
  @IsNotEmpty()
  amountMin: number;

  @ApiProperty({ example: 10000, description: 'Monto máximo' })
  @IsNumber()
  @IsNotEmpty()
  amountMax: number;

  @ApiProperty({ example: 12.5, description: 'TEA (porcentaje o decimal)' })
  @IsNumber()
  @IsNotEmpty()
  tea: number;

  @ApiProperty({ example: 'uuid-institucion', description: 'ID de la institución' })
  @IsString()
  @IsNotEmpty()
  idInstitucionFinanciera: string;
}
