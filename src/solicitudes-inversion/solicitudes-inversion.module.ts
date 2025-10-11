import { Module } from '@nestjs/common';
import { SolicitudesInversionService } from './solicitudes-inversion.service';
import { SolicitudesInversionController } from './solicitudes-inversion.controller';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inversiones } from 'src/inversiones/entities/inversione.entity';
import { User } from 'src/user/entities/user.entity';
import { SolicitudesInversion } from './entities/solicitudes-inversion.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudesInversion, InstitucionFinanciera, User, Inversiones]),
    CloudinaryModule,
  ],
  controllers: [SolicitudesInversionController],
  providers: [SolicitudesInversionService],
  exports: [SolicitudesInversionService],
})
export class SolicitudesInversionModule {}
