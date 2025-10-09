import { IndirectChargeOrmEntity } from './credit/entities/indirect-charge.orm-entity';
import { AmortizationTableOrmEntity } from './credit/entities/amortization-table.orm-entity';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'proyectoEconomia',
      entities: [
        User,
        CreditTypeOrmEntity,
        CreditSimulationOrmEntity,
        IndirectChargeOrmEntity,
        AmortizationTableOrmEntity,
        InstitucionFinanciera,
        TipoInversion,
      ],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    CreditModule,
    InstitucionFinancieraModule,
    TipoInversionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}