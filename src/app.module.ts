import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InstitucionFinancieraModule } from './institucion-financiera/institucion-financiera.module';
import { TipoInversionModule } from './tipo-inversion/tipo-inversion.module';
import { CreditTypeOrmEntity } from './credit/entities/credit-type.orm-entity';
import { CreditModule } from './credit/credit.module';
import { CreditSimulationOrmEntity } from './credit/entities/credit-simulation.orm-entity';
import { User } from './user/entities/user.entity';
import { InstitucionFinanciera } from './institucion-financiera/entities/institucion-financiera.entity';
import { TipoInversion } from './tipo-inversion/entities/tipo-inversion.entity';
import { SimuladorInversionModule } from './simulador-inversion/simulador-inversion.module';
import { InversionesActivasModule } from './inversiones-activas/inversiones-activas.module';
import { SimuladorInversion } from './simulador-inversion/entities/simulador-inversion.entity';
import { InversionesActiva } from './inversiones-activas/entities/inversiones-activa.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'mysql',          // MySQL o MariaDB
      host: process.env.DB_HOST || 'localhost',      // tu servidor de XAMPP
      port: Number(process.env.DB_PORT) || 3306,             // puerto por defecto de MySQL
      username: process.env.DB_USERNAME || 'root',       // tu usuario de MySQL
      password: process.env.DB_PASSWORD || '',           // tu contraseña, si tienes
      database: process.env.DB_DATABASE || 'proyectoeconomia',  // reemplaza con el nombre de tu base de datos
      entities: [
        User, 
        CreditTypeOrmEntity, 
        CreditSimulationOrmEntity,
        InstitucionFinanciera,
        TipoInversion,
        SimuladorInversion,
        InversionesActiva,
        
      ],       // todas las entidades que uses
      synchronize: true,      // para desarrollo: crea las tablas automáticamente
    }),
    UserModule,
    AuthModule,
    CreditModule,
    InstitucionFinancieraModule,
    TipoInversionModule,
    SimuladorInversionModule,
    InversionesActivasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
