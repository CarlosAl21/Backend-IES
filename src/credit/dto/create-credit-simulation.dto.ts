import { IsInt, IsNumber } from 'class-validator';

export class CreateCreditSimulationDto {
  @IsInt()
  tipo_credito_id: number;

  @IsNumber()
  monto_simulado: number;

  @IsInt()
  plazo_meses: number;

  @IsNumber()
  tasa_interes: number;
}
