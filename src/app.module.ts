import { IndirectChargeOrmEntity } from './credit/entities/indirect-charge.orm-entity';
import { AmortizationTableOrmEntity } from './credit/entities/amortization-table.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { CreditTypeOrmEntity } from './credit/entities/credit-type.orm-entity';
import { CreditSimulationOrmEntity } from './credit/entities/credit-simulation.orm-entity';
import { CreditModule } from './credit/credit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',         
      host: 'localhost',     
      port: 3306,             
      username: 'root',     
      password: '',       
      database: 'proyectoEconomia',  
       entities: [
         User,
         CreditTypeOrmEntity,
         CreditSimulationOrmEntity,
         IndirectChargeOrmEntity,
         AmortizationTableOrmEntity,
       ], // todas las entidades que uses
      synchronize: false,      
    }),
    UserModule,
    AuthModule,
  CreditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
