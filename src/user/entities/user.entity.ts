import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
    idUser: string;

    @Column('varchar', { length: 100 })
    name: string;
    
    @Column('varchar', {length: 100})
    lastname: string;

    @Column('varchar', { length: 100, unique: true })
    email: string;

    @Column('varchar', { length: 100, unique: true })
    cedula: string;

    @Column('date')
    birthdate: Date;

    @Column('varchar', { length: 255 })
    address: string;

    @Column('varchar', { length: 10 })
    phone: string;

    @Column('varchar', { length: 100, nullable: true })
    genere: string;

    @Column('varchar', { length: 255, nullable: true })
    occupation: string;

    @Column('number', { default: 0, nullable: true })
    monthly_income: number;

    @Column('varchar', { length: 255 })
    password: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @Column('boolean', { default: false })
    isAdmin: boolean;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    @BeforeInsert()
    async isActiveDefault() {
        this.isActive = true;
    }

    @BeforeInsert()
    async isAdminDefault() {
        this.isAdmin = false;
    }

    

}
