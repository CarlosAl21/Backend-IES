import { InstitucionFinanciera } from "src/institucion-financiera/entities/institucion-financiera.entity";
import { InversionesActiva } from "src/inversiones-activas/entities/inversiones-activa.entity";
import { SimuladorInversion } from "src/simulador-inversion/entities/simulador-inversion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoInversion {
    @PrimaryGeneratedColumn('uuid')
    idTipoInversion: string;

    @Column('varchar', { length: 100 })
    nombre: string;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    tasaRendimientoAnual: number;

    @Column('integer', { default: 30 })
    plazoMinimoDias: number;

    @Column('decimal', { precision: 10, scale: 2, default: 1 })
    montoMinimo: number;

    @Column('varchar', { length: 255, nullable: true })
    descripcion: string;

    @Column('varchar', { length: 100})
    riesgo: string;

    @Column('boolean', { default: true })
    estado: boolean;

    @OneToMany(() => SimuladorInversion, simulacion => simulacion.idTipoInversion)
    simulaciones: SimuladorInversion[];

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fechaActualizacion: Date;

    @ManyToOne(() => InstitucionFinanciera, institucion => institucion.tiposInversion)
    @JoinColumn({ name: 'idInstitucionFinanciera' })
    idInstitucionFinanciera: InstitucionFinanciera;

    @OneToMany(() => SimuladorInversion, simulacion => simulacion.idTipoInversion)
    inversionesActivas: SimuladorInversion[];

    @OneToMany(() => InversionesActiva, inversionActiva => inversionActiva.tipoInversion)
    inversionesActivasList: InversionesActiva[];
    
}
