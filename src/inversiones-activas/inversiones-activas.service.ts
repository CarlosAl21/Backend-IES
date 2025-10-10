import { Injectable } from '@nestjs/common';
import { CreateInversionesActivaDto } from './dto/create-inversiones-activa.dto';
import { UpdateInversionesActivaDto } from './dto/update-inversiones-activa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InversionesActiva } from './entities/inversiones-activa.entity';
import { Repository } from 'typeorm';
import { TipoInversion } from 'src/tipo-inversion/entities/tipo-inversion.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InversionesActivasService {
  constructor(
    @InjectRepository(InversionesActiva)
    private inversionesActivasRepository: Repository<InversionesActiva>,
    @InjectRepository(TipoInversion)
    private tipoInversionRepository: Repository<TipoInversion>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createInversionesActivaDto: CreateInversionesActivaDto) {
    try {
      const tipoInversion = await this.tipoInversionRepository.findOneBy({idTipoInversion: createInversionesActivaDto.idTipoInversion});
      if(!tipoInversion) throw new Error('Tipo de Inversión no encontrado');
      const user = await this.userRepository.findOneBy({idUser: createInversionesActivaDto.idUser});
      if(!user) throw new Error('Usuario no encontrado');
      const nuevaInversionActiva = this.inversionesActivasRepository.create({
        montoInvertido: createInversionesActivaDto.montoInvertido,
        fechaInicio: createInversionesActivaDto.fechaInicio,
        fechaVencimiento: createInversionesActivaDto.fechaVencimiento,
        tasaRendimiento: createInversionesActivaDto.tasaRendimiento,
        tipoInversion: tipoInversion,
        usuario: user
      });
      return await this.inversionesActivasRepository.save(nuevaInversionActiva);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear la inversión activa');
    }
  }

  async findAll() {
    try {
      return await this.inversionesActivasRepository.find({
        relations: ['tipoInversion', 'usuario'],
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener las inversiones activas');
    }
  }

  async findOne(id: string) {
    try {
      return await this.inversionesActivasRepository.findOne({
        where: { idInversionActiva: id },
        relations: ['tipoInversion', 'usuario'],
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener la inversión activa');
    }
  }

  async update(id: string, updateInversionesActivaDto: UpdateInversionesActivaDto) {
    try {
      await this.inversionesActivasRepository.update(id, updateInversionesActivaDto);
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new Error('Error al actualizar la inversión activa');
    }
  }

  async remove(id: string) {
    try {
      const inversionActiva = await this.inversionesActivasRepository.findOneBy({idInversionActiva: id});
      if (!inversionActiva) throw new Error('Inversión activa no encontrada');
      inversionActiva.estado = false;
      await this.inversionesActivasRepository.save(inversionActiva);
      return { message: 'Inversión activa eliminada correctamente' };
    } catch (error) {
      console.log(error);
      throw new Error('Error al eliminar la inversión activa');
    }
  }
}
