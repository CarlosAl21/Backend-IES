import { TipoInversion } from "src/tipo-inversion/entities/tipo-inversion.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class InversionesActiva {
    @PrimaryGeneratedColumn('uuid')
    idInversionActiva: string;
    
    @Column('decimal', { precision: 15, scale: 2 })
    montoInvertido: number;

    @Column('date')
    fechaInicio: Date;

    @Column('date')
    fechaVencimiento: Date;

    @Column('decimal', { precision: 15, scale: 2 })
    tasaRendimiento: number;

    @Column('boolean', { default: true })
    estado: boolean;

    @ManyToOne(() => TipoInversion, (tipoInversion) => tipoInversion.inversionesActivas)
    @JoinColumn({ name: 'idTipoInversion' })
    tipoInversion: TipoInversion;

    @ManyToOne(() => User, (user) => user.inversionesActivas)
    @JoinColumn({ name: 'idUser' })
    usuario: User;

    @CreateDateColumn({ type: 'timestamp' })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    fechaActualizacion: Date;

    
}
