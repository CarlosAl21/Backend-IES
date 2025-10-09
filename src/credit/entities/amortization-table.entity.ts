export class AmortizationTable {
  id: number;
  simulacion_id: number;
  numero_cuota: number;
  fecha_vencimiento: Date;
  capital: number;
  interes: number;
  cobros_adicionales: number;
  total_cuota: number;
  saldo_restante: number;
}
