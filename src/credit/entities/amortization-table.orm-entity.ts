import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Tabla_Amortizacion_Simulada')
export class AmortizationTableOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  simulacion_id: number;

  @Column('int')
  numero_cuota: number;

  @Column('date')
  fecha_vencimiento: Date;

  @Column('decimal')
  capital: number;

  @Column('decimal')
  interes: number;

  @Column('decimal')
  cobros_adicionales: number;

  @Column('decimal')
  total_cuota: number;

  @Column('decimal')
  saldo_restante: number;
}
