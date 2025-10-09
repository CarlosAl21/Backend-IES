import { InstitucionFinanciera } from "src/institucion-financiera/entities/institucion-financiera.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoInversion {
    @PrimaryGeneratedColumn('uuid')
    idTipoInversion: string;

    @Column('varchar', { length: 100 })
    nombre: string;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    tasaRendimientoAnual: number;

    @Column('integer', { default: 1 })
    plazoMinimoMeses: number;

    @Column('decimal', { precision: 10, scale: 2, default: 1 })
    montoMinimo: number;

    @Column('varchar', { length: 255, nullable: true })
    descripcion: string;

    @Column('varchar', { length: 100})
    riesgo: string;

    @Column('boolean', { default: true })
    estado: boolean;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    fechaActualizacion: Date;

    @ManyToOne(() => InstitucionFinanciera, institucion => institucion.tiposInversion)
    @JoinColumn({ name: 'idInstitucionFinanciera' })
    idInstitucionFinanciera: InstitucionFinanciera;
}
