import { Injectable } from '@nestjs/common';
import { CreateTipoInversionDto } from './dto/create-tipo-inversion.dto';
import { UpdateTipoInversionDto } from './dto/update-tipo-inversion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoInversion } from './entities/tipo-inversion.entity';
import { Repository } from 'typeorm';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';

@Injectable()
export class TipoInversionService {
  constructor(
    @InjectRepository(TipoInversion)
    private tipoInversionRepository: Repository<TipoInversion>,
    @InjectRepository(InstitucionFinanciera)
    private institucionFinancieraRepository: Repository<InstitucionFinanciera>,
  ) {}

  async create(createTipoInversionDto: CreateTipoInversionDto) {
    try {
      const institucion = await this.institucionFinancieraRepository.findOne({
        where: { idInstitucionFinanciera: createTipoInversionDto.idInstitucionFinanciera },
      });
      if (!institucion) {
        throw new Error('Institucion Financiera not found');
      }
      const tipoInversion = this.tipoInversionRepository.create({
        ...createTipoInversionDto,
        idInstitucionFinanciera: institucion,
      });
      await this.tipoInversionRepository.save(tipoInversion);
      return tipoInversion;
    } catch (error) {
      console.error('Error creating TipoInversion:', error);
      throw new Error('Error creating TipoInversion');

    }
  }

  async findAll() {
    try {
      return await this.tipoInversionRepository.find({
        relations: ['idInstitucionFinanciera'],
      });
    } catch (error) {
      console.error('Error fetching all TipoInversion:', error);
      throw new Error('Error fetching all TipoInversion');
    }
  }

  async findOne(id: string) {
    try {
      return await this.tipoInversionRepository.findOne({
        where: { idTipoInversion: id },
        relations: ['idInstitucionFinanciera'],
      });
    } catch (error) {
      console.error('Error fetching TipoInversion:', error);
      throw new Error('Error fetching TipoInversion');
    }
  }

  async update(id: string, updateTipoInversionDto: UpdateTipoInversionDto) {
    try {
      const tipoInversion = await this.tipoInversionRepository.findOne({
        where: { idTipoInversion: id },
      });
      if (!tipoInversion) {
        throw new Error('TipoInversion not found');
      }
      if (updateTipoInversionDto.idInstitucionFinanciera) {
        const institucion = await this.institucionFinancieraRepository.findOne({
          where: { idInstitucionFinanciera: updateTipoInversionDto.idInstitucionFinanciera },
        });
        if (!institucion) {
          throw new Error('Institucion Financiera not found');
        }
        tipoInversion.idInstitucionFinanciera = institucion;
      }
      const { idInstitucionFinanciera, ...rest } = updateTipoInversionDto as any;
      this.tipoInversionRepository.merge(tipoInversion, rest);
      await this.tipoInversionRepository.save(tipoInversion);
      return tipoInversion;
    } catch (error) {
      console.error('Error updating TipoInversion:', error);
      throw new Error('Error updating TipoInversion');
    }
  }

  async remove(id: string) {
    try {
      const tipoInversion = await this.tipoInversionRepository.findOne({
        where: { idTipoInversion: id },
      });
      if (!tipoInversion) {
        throw new Error('TipoInversion not found');
      }
      tipoInversion.estado = false;
      await this.tipoInversionRepository.save(tipoInversion);
      return { message: 'TipoInversion removed successfully' }; 
    } catch (error) {
      console.error('Error removing TipoInversion:', error);
      throw new Error('Error removing TipoInversion');
    }
  }
}
