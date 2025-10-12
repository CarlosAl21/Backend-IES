import { InstitucionFinanciera } from "src/institucion-financiera/entities/institucion-financiera.entity";
import { Inversiones } from "src/inversiones/entities/inversione.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SolicitudesInversion {
    @PrimaryGeneratedColumn('uuid')
    idSolicitud: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column('int')
    plazo: number;

    @Column('varchar', { length: 255 })
    motivo: string;

    @Column('varchar', { length: 255 })
    descripcion: string;

    @Column('varchar', { length: 255 })
    documento_url: string;

    @Column('varchar', { length: 255 })
    profesion: string;

    @Column('varchar', { length: 255 })
    ingresosMensuales: string;

    @Column('decimal', { precision: 10, scale: 2 })
    montoGanar: number;

    @Column('decimal', { precision: 10, scale: 2 })
    montoTotal: number;

    @Column('enum', { enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' })
    estado: 'Pendiente' | 'Aprobado' | 'Rechazado';

    @ManyToOne(() => User, user => user.solicitudesInversion, { eager: true })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @ManyToOne(() => InstitucionFinanciera, institucion => institucion.solicitudesInversion)
    @JoinColumn({ name: 'idInstitucion' })
    institucionFinanciera: InstitucionFinanciera;

    @ManyToOne(() => Inversiones, inversion => inversion.solicitudesInversion, { eager: true })
    @JoinColumn({ name: 'idInversion' })
    inversion: Inversiones;

    @Column('boolean', { default: true })
    isActive: boolean;
}

