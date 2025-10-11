import { Injectable } from '@nestjs/common';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Credito } from './entities/credito.entity';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreditosService {
  constructor(
    @InjectRepository(Credito)
    private creditoRepository: Repository<Credito>,
    @InjectRepository(InstitucionFinanciera)
    private institucionFinancieraRepository: Repository<InstitucionFinanciera>,
  ) {}

  async create(createCreditoDto: CreateCreditoDto) {
    try {
      const institucion = await this.institucionFinancieraRepository.findOne({
        where: { idInstitucionFinanciera: createCreditoDto.idInstitucionFinanciera },
      });
      if (!institucion) {
        throw new Error('Institucion Financiera no encontrada');
      }
      const nuevoCredito = this.creditoRepository.create({
        ...createCreditoDto,
        institucionFinanciera: institucion,
      });
      return await this.creditoRepository.save(nuevoCredito);
    } catch (error) {
      throw new Error('Error al crear el credito');
    }
  }

  async findAll() {
    try {
      return await this.creditoRepository.find();
    } catch (error) {
      throw new Error('Error al obtener los creditos');
    }
  }

  async findOne(id: string) {
    try {
      const credito = await this.creditoRepository.findOne({
        where: { idCredito: id },
        relations: ['institucionFinanciera'],
      });
      if (!credito) {
        throw new Error('Credito no encontrado');
      }
      return credito;
    } catch (error) {
      throw new Error('Error al obtener el credito');
    }
  }

  async update(id: string, updateCreditoDto: UpdateCreditoDto) {
    try {
      const credito = await this.creditoRepository.findOne({
        where: { idCredito: id },
      });
      if (!credito) {
        throw new Error('Credito no encontrado');
      }
      this.creditoRepository.merge(credito, updateCreditoDto);
      return await this.creditoRepository.save(credito);
    } catch (error) {
      
    }
  }

  async remove(id: string) {
    try {
      const credito = await this.creditoRepository.findOne({
        where: { idCredito: id },
      });
      if (!credito) {
        throw new Error('Credito no encontrado');
      }
      credito.active = false;
      await this.creditoRepository.save(credito);
      return { message: 'Credito eliminado correctamente' };
    } catch (error) {
      throw new Error('Error al eliminar el credito');
    }
  }

  async findByInstitucionFinanciera(idInstitucionFinanciera: string) {
    try {
      const institucionFinanciera = await this.institucionFinancieraRepository.findOne({
        where: { idInstitucionFinanciera },
      });
      if (!institucionFinanciera) {
        throw new Error('Institucion Financiera no encontrada');
      }
      return await this.creditoRepository.find({
        where: { institucionFinanciera: { idInstitucionFinanciera } },
      });
    } catch (error) {
      throw new Error('Error al obtener los creditos por institucion financiera');
    }
  }
}
