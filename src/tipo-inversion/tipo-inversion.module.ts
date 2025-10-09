import { Module } from '@nestjs/common';
import { TipoInversionService } from './tipo-inversion.service';
import { TipoInversionController } from './tipo-inversion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInversion } from './entities/tipo-inversion.entity';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoInversion, InstitucionFinanciera]),
  ],
  controllers: [TipoInversionController],
  providers: [TipoInversionService],
  exports: [TipoInversionService],
})
export class TipoInversionModule {}
