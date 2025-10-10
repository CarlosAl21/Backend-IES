import { Module } from '@nestjs/common';
import { InversionesActivasService } from './inversiones-activas.service';
import { InversionesActivasController } from './inversiones-activas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { TipoInversion } from 'src/tipo-inversion/entities/tipo-inversion.entity';
import { InversionesActiva } from './entities/inversiones-activa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, TipoInversion, InversionesActiva])
  ],
  controllers: [InversionesActivasController],
  providers: [InversionesActivasService],
  exports: [InversionesActivasService]
})
export class InversionesActivasModule {}
