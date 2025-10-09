import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Tipos_Credito')
export class CreditTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institution_id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  tasa_interes_anual: number;

  @Column('int')
  plazo_max_meses: number;

  @Column('decimal')
  monto_minimo: number;

  @Column('decimal')
  monto_maximo: number;

  @Column('text')
  descripcion: string;

  @Column()
  estado: string;
}
