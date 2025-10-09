import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Cobros_Indirectos')
export class IndirectChargeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column('decimal')
  valor: number;

  @Column()
  aplica_a: string;

  @Column()
  estado: string;
}
