import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { SolicitudesInversion } from 'src/solicitudes-inversion/entities/solicitudes-inversion.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('varchar', { length: 100})
  secondName: string;

  @Column('varchar', {length: 100})
  secondLastName: string;

  @Column('varchar', {length:10})
  phone: string;

  @Column('varchar', { length: 7})
  homePhone: string;

  @Column('varchar', { length: 10, unique: true })
  cedula: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('enum', { enum: ['Usuario', 'Administrador', 'SuperAdministrador', 'Revisor'], default: 'Usuario' })
  role: 'Usuario' | 'Administrador' | 'SuperAdministrador' | 'Revisor';

  @ManyToOne(() => InstitucionFinanciera, (institucion) => institucion.users, { eager: true, nullable: true })
  @JoinColumn({ name: 'idInstitucionFinanciera' })
  idInstitucionFinanciera: InstitucionFinanciera;

  @OneToMany(() => SolicitudesInversion, (solicitudes) => solicitudes.user)
  solicitudesInversion: SolicitudesInversion[];

  @Column('varchar', { length: 255, nullable: true })
  resetPasswordToken?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires?: Date | null;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async isActiveDefault() {
    this.isActive = true;
  }

}
