import { Module } from '@nestjs/common';
import { InstitucionFinancieraService } from './institucion-financiera.service';
import { InstitucionFinancieraController } from './institucion-financiera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { InstitucionFinanciera } from './entities/institucion-financiera.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstitucionFinanciera, User]),
    CloudinaryModule,
  ],
  controllers: [InstitucionFinancieraController],
  providers: [InstitucionFinancieraService],
  exports: [InstitucionFinancieraService],
})
export class InstitucionFinancieraModule {}
