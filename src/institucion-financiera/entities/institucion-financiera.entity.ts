import { Credito } from "src/creditos/entities/credito.entity";
import { Inversiones } from "src/inversiones/entities/inversione.entity";
import { SolicitudesInversion } from "src/solicitudes-inversion/entities/solicitudes-inversion.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InstitucionFinanciera {
    @PrimaryGeneratedColumn('uuid')
    idInstitucionFinanciera: string;

    @Column('varchar', { length: 255 })
    logo_url: string;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 255 })
    mission: string;

    @Column('varchar', { length: 255 })
    vision: string;

    @Column('varchar', { length: 255 })
    primaryColor: string;

    @Column('varchar', { length: 255 })
    secondaryColor: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @OneToMany(() => User, (user) => user.idInstitucionFinanciera)
    users: User[];

    @OneToMany(() => Inversiones, (inversiones) => inversiones.institucionFinanciera)
    inversiones: Inversiones[];

    @OneToMany(() => Credito, (credito) => credito.institucionFinanciera)
    creditos: Credito[];

    @OneToMany(() => SolicitudesInversion, (solicitudes) => solicitudes.institucionFinanciera)
    solicitudesInversion: SolicitudesInversion[];

    @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
