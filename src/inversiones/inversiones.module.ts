import { Module } from '@nestjs/common';
import { InversionesService } from './inversiones.service';
import { InversionesController } from './inversiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { Inversiones } from './entities/inversione.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitucionFinanciera, Inversiones]) // Agrega tus entidades aquí
  ],
  controllers: [InversionesController],
  providers: [InversionesService],
  exports: [InversionesService],
})
export class InversionesModule {}
