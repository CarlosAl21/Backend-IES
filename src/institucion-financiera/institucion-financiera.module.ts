import { Module } from '@nestjs/common';
import { InstitucionFinancieraService } from './institucion-financiera.service';
import { InstitucionFinancieraController } from './institucion-financiera.controller';

@Module({
  controllers: [InstitucionFinancieraController],
  providers: [InstitucionFinancieraService],
})
export class InstitucionFinancieraModule {}
