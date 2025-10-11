import { Injectable } from '@nestjs/common';
import { CreateInversioneDto } from './dto/create-inversione.dto';
import { UpdateInversioneDto } from './dto/update-inversione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { Repository } from 'typeorm';
import { Inversiones } from './entities/inversione.entity';

@Injectable()
export class InversionesService {
  constructor(
    @InjectRepository(Inversiones)
    private inversionesRepository: Repository<Inversiones>,
    @InjectRepository(InstitucionFinanciera)
    private institucionFinancieraRepository: Repository<InstitucionFinanciera>,
  ) {}
  async create(createInversioneDto: CreateInversioneDto) {
    try {
      const institucionFinanciera = await this.institucionFinancieraRepository.findOne({
        where: { idInstitucionFinanciera: createInversioneDto.idInstitucionFinanciera },
      });
      if (!institucionFinanciera) {
        throw new Error('Institucion Financiera not found');
      }
      const nuevaInversion = this.inversionesRepository.create({
        ...createInversioneDto,
        institucionFinanciera,
      });
      return await this.inversionesRepository.save(nuevaInversion);
    } catch (error) {
      throw new Error('Error creating inversion: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.inversionesRepository.find();
    } catch (error) {
      throw new Error('Error fetching inversiones: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      const inversion = await this.inversionesRepository.findOne({ where: { idInversion: id } });
      if (!inversion) {
        throw new Error('Inversion not found');
      }
      return inversion;
    } catch (error) {
      throw new Error('Error fetching inversion: ' + error.message);
    }
  }

  async update(id: string, updateInversioneDto: UpdateInversioneDto) {
    try {
      const inversion = await this.inversionesRepository.findOne({ where: { idInversion: id } });
      if (!inversion) {
        throw new Error('Inversion not found');
      }
      this.inversionesRepository.merge(inversion, updateInversioneDto);
      return await this.inversionesRepository.save(inversion);
    } catch (error) {
      throw new Error('Error updating inversion: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      const inversion = await this.inversionesRepository.findOne({ where: { idInversion: id } });
      if (!inversion) {
        throw new Error('Inversion not found');
      }
      inversion.isActive = false;
      await this.inversionesRepository.save(inversion);
      return { message: 'Inversion removed successfully' };
    } catch (error) {
      throw new Error('Error removing inversion: ' + error.message);
    }
  }

  async findByInstitucionFinanciera(idInstitucionFinanciera: string) {
    try {
      const institucionFinanciera = await this.institucionFinancieraRepository.findOne({
        where: { idInstitucionFinanciera },
      });
      if (!institucionFinanciera) {
        throw new Error('Institucion Financiera not found');
      }
      return await this.inversionesRepository.find({
        where: { institucionFinanciera: { idInstitucionFinanciera } },
      });
    }
    catch (error) {
      throw new Error('Error fetching inversiones by institucion financiera: ' + error.message);
    }
  }
}
