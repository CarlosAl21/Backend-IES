import { TipoInversion } from "src/tipo-inversion/entities/tipo-inversion.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SimuladorInversion {
    @PrimaryGeneratedColumn('uuid')
    idSimuladorInversion: string;

    @Column('decimal', { precision: 10, scale: 2 })
    montoSimulado: number;

    @Column('int')
    plazoSimulado: number;

    @Column('date')
    fechaSimulacion: Date;

    @Column('json')
    resultados: any;

    @ManyToOne(() => TipoInversion, tipoInversion => tipoInversion.simulaciones)
    @JoinColumn({ name: 'idTipoInversion' })
    idTipoInversion: TipoInversion;
}
