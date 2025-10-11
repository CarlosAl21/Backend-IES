import { InstitucionFinanciera } from "src/institucion-financiera/entities/institucion-financiera.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Credito {
    @PrimaryGeneratedColumn('uuid')
    idCredito: string;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('double',{ precision: 10, scale: 2 })
    tna: number;

    @Column('double',{ precision: 10, scale: 2 })
    tea: number;

    @Column('json')
    seguros: any;

    @Column('int', { default: 1 })
    monthsMin: number;

    @Column('int')
    monthsMax: number;

    @Column('double',{ precision: 10, scale: 2 })
    amountMin: number;

    @Column('double',{ precision: 10, scale: 2 })
    amountMax: number;

    @Column('boolean', { default: false })
    knowAmount: boolean;

    @Column('boolean', { default: true })
    active: boolean;

    @ManyToOne(() => InstitucionFinanciera, (institucionFinanciera) => institucionFinanciera.creditos, { eager: true })
    @JoinColumn({ name: 'idInstitucionFinanciera' })
    institucionFinanciera: InstitucionFinanciera;

}
