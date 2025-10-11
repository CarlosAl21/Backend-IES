import { Injectable } from '@nestjs/common';
import { CreateSolicitudesInversionDto } from './dto/create-solicitudes-inversion.dto';
import { UpdateSolicitudesInversionDto } from './dto/update-solicitudes-inversion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SolicitudesInversion } from './entities/solicitudes-inversion.entity';
import { Inversiones } from 'src/inversiones/entities/inversione.entity';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class SolicitudesInversionService {
  constructor(
    @InjectRepository(SolicitudesInversion)
    private readonly solicitudesInversionRepository: Repository<SolicitudesInversion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Inversiones)
    private readonly inversionesRepository: Repository<Inversiones>,
    @InjectRepository(InstitucionFinanciera)
    private readonly institucionFinancieraRepository: Repository<InstitucionFinanciera>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createSolicitudesInversionDto: CreateSolicitudesInversionDto, files?: Array<Express.Multer.File>) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: createSolicitudesInversionDto.idUser } });
      const inversion = await this.inversionesRepository.findOne({ where: { idInversion: createSolicitudesInversionDto.idInversion } });
      const institucion = await this.institucionFinancieraRepository.findOne({ where: { idInstitucionFinanciera: createSolicitudesInversionDto.idInstitucion } });
      if (!user || !inversion || !institucion) {
        throw new Error('User, Inversion or InstitucionFinanciera not found');
      }

      // Validaciones contra límites definidos en la inversión
      const monto = Number(createSolicitudesInversionDto.amount);
      const plazo = Number(createSolicitudesInversionDto.plazo); // en meses
      const amountMin = Number(inversion.amountMin ?? 0);
      const amountMax = Number(inversion.amountMax ?? Infinity);
      const monthsMin = Number(inversion.monthsMin ?? 1);
      const monthsMax = Number(inversion.monthsMax ?? Infinity);

      if (isNaN(monto) || monto <= 1) throw new Error('Monto inválido');
      if (monto < amountMin || monto > amountMax) throw new Error(`Monto fuera de rango para esta inversión (${amountMin} - ${amountMax})`);
      if (isNaN(plazo) || plazo <= 1) throw new Error('Plazo inválido');
      if (plazo < monthsMin || plazo > monthsMax) throw new Error(`Plazo fuera de rango para esta inversión (${monthsMin} - ${monthsMax} meses)`);

      // Calculo usando TEA (tasa efectiva anual) -> capitalización mensual compuesta
      // Normalizar tea (si viene en porcentaje 12.5 -> 0.125)
      const rawTea = Number(inversion.tea ?? 0);
      const teaDecimal = rawTea > 1 ? rawTea / 100 : rawTea; // soporte 12.5 o 0.125
      // factor anual a periodo de plazo meses: montoFinal = monto * (1 + teaDecimal)^(plazo/12)
      const factor = Math.pow(1 + (teaDecimal || 0), plazo / 12);
      const montoTotal = +(monto * factor).toFixed(2);
      const montoGanar = +(montoTotal - monto).toFixed(2);

      // Crear la solicitud incluyendo los montos calculados
      const solicitud = this.solicitudesInversionRepository.create({
        ...createSolicitudesInversionDto,
        user,
        inversion,
        institucionFinanciera: institucion,
        montoGanar,
        montoTotal,
      });

      // Si hay archivos, subirlos a Cloudinary y crear los registros de fotos
      if (files && files.length > 0) {
        const uploadPromises = files.map(file => this.cloudinaryService.upload(file));
        const uploadResults = await Promise.all(uploadPromises);

        const fotosPromises = uploadResults.map(result =>
          solicitud.documento_url = result.secure_url
        );

        await Promise.all(fotosPromises);
      }

      return await this.solicitudesInversionRepository.save(solicitud);
    } catch (error) {
      console.error('Error creating solicitud:', error);
      throw new Error('Error creating solicitud');
    }
  }

  async findAll() {
    try {
      return await this.solicitudesInversionRepository.find();
    } catch (error) {
      console.error('Error finding solicitudes:', error);
      throw new Error('Error finding solicitudes');
    }
  }

  async findAllByInstitucion(idInstitucion: string) {
    try {
      return await this.solicitudesInversionRepository.find({
        where: { institucionFinanciera: { idInstitucionFinanciera: idInstitucion } },
        relations: ['user', 'inversion', 'institucionFinanciera'],
      });
    } catch (error) {
      console.error('Error finding solicitudes by institucion:', error);
      throw new Error('Error finding solicitudes by institucion');
    }
  }

  async findOne(id: string) {
    try {
      return await this.solicitudesInversionRepository.findOne({ where: { idSolicitud: id } });
    } catch (error) {
      console.error('Error finding solicitud:', error);
      throw new Error('Error finding solicitud');
    }
  }

  async update(id: string, updateSolicitudesInversionDto: UpdateSolicitudesInversionDto) {
    try {
      await this.solicitudesInversionRepository.update({ idSolicitud: id }, updateSolicitudesInversionDto);
      return await this.solicitudesInversionRepository.findOne({ where: { idSolicitud: id } });
    } catch (error) {
      console.error('Error updating solicitud:', error);
      throw new Error('Error updating solicitud');
    }
  }

  async remove(id: string) {
    try {
      const solicitud = await this.solicitudesInversionRepository.findOne({ where: { idSolicitud: id } });
      if (!solicitud) {
        throw new Error('Solicitud not found');
      }
      solicitud.isActive = false;
      await this.solicitudesInversionRepository.save(solicitud);
      return { message: 'Solicitud de inversion desactivada exitosamente' };
    } catch (error) {
      console.error('Error removing solicitud:', error);
      throw new Error('Error removing solicitud');
    }
  }
}
