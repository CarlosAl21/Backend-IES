import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Simulaciones_Credito')
export class CreditSimulationOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipo_credito_id: number;

  @Column('decimal')
  monto_simulado: number;

  @Column('int')
  plazo_meses: number;

  @Column('decimal')
  tasa_interes: number;

  @Column('datetime')
  fecha_simulacion: Date;

  @Column('json')
  resultado_json: any;
}
