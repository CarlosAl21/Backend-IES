import { IsInt, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCreditTypeDto {
  @IsInt()
  institution_id: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  tasa_interes_anual: number;

  @IsInt()
  plazo_max_meses: number;

  @IsNumber()
  monto_minimo: number;

  @IsNumber()
  monto_maximo: number;

  @IsString()
  descripcion: string;

  @IsString()
  estado: string;
}
