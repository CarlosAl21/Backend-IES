import { TipoInversion } from "src/tipo-inversion/entities/tipo-inversion.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InstitucionFinanciera {
    @PrimaryGeneratedColumn('uuid')
    idInstitucionFinanciera: string;

    @Column('varchar', { length: 255 })
    logo: string;

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

    @OneToMany(() => TipoInversion, (tipoInversion) => tipoInversion.idInstitucionFinanciera)
    tiposInversion: TipoInversion[];

}
