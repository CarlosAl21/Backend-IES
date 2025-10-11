import { InstitucionFinanciera } from "src/institucion-financiera/entities/institucion-financiera.entity";
import { SolicitudesInversion } from "src/solicitudes-inversion/entities/solicitudes-inversion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inversiones {
    @PrimaryGeneratedColumn('uuid')
    idInversion: string;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('int', { default: 1 })
    monthsMin: number;

    @Column('int')
    monthsMax: number;

    @Column('int', { default: 1 })
    amountMin: number;

    @Column('int')
    amountMax: number;

    @Column('decimal', { precision: 5, scale: 2 })
    tea: number;

    @Column('boolean', { default: true })
    isActive: boolean;

    @ManyToOne(() => InstitucionFinanciera, (institucionFinanciera) => institucionFinanciera.inversiones, { eager: true })
    @JoinColumn({ name: 'idInstitucionFinanciera' })
    institucionFinanciera: InstitucionFinanciera;

    @OneToMany(() => SolicitudesInversion, (solicitud) => solicitud.inversion)
    solicitudesInversion: SolicitudesInversion[];
    
}
