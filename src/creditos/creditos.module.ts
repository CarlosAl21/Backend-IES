import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreditosController } from './creditos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { Credito } from './entities/credito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitucionFinanciera, Credito]) // Agrega tus entidades aquí
  ],
  controllers: [CreditosController],
  providers: [CreditosService],
  exports: [CreditosService],
})
export class CreditosModule {}
