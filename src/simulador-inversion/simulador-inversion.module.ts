import { Module } from '@nestjs/common';
import { SimuladorInversionService } from './simulador-inversion.service';
import { SimuladorInversionController } from './simulador-inversion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimuladorInversion } from './entities/simulador-inversion.entity';
import { TipoInversion } from 'src/tipo-inversion/entities/tipo-inversion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SimuladorInversion, TipoInversion]),
  ],
  controllers: [SimuladorInversionController],
  providers: [SimuladorInversionService],
  exports: [SimuladorInversionService],
})
export class SimuladorInversionModule {}
