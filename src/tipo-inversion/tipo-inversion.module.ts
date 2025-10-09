import { Module } from '@nestjs/common';
import { TipoInversionService } from './tipo-inversion.service';
import { TipoInversionController } from './tipo-inversion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [TipoInversionController],
  providers: [TipoInversionService],
})
export class TipoInversionModule {}
