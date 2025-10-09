import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditTypeDto, CreateCreditSimulationDto } from './dto';
import { CreditTypeOrmEntity } from './entities/credit-type.orm-entity';
import { CreditSimulationOrmEntity } from './entities/credit-simulation.orm-entity';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(CreditTypeOrmEntity)
    private readonly creditTypeRepository: Repository<CreditTypeOrmEntity>,
    @InjectRepository(CreditSimulationOrmEntity)
    private readonly creditSimulationRepository: Repository<CreditSimulationOrmEntity>,
  ) {}

  async createCreditType(dto: CreateCreditTypeDto): Promise<CreditTypeOrmEntity> {
    const newType = this.creditTypeRepository.create(dto);
    return this.creditTypeRepository.save(newType);
  }

  async findAllCreditTypes(): Promise<CreditTypeOrmEntity[]> {
    return this.creditTypeRepository.find();
  }

  async simulateCredit(dto: CreateCreditSimulationDto): Promise<CreditSimulationOrmEntity> {
    const simulation = this.creditSimulationRepository.create({
      ...dto,
      fecha_simulacion: new Date(),
      resultado_json: {},
    });
    return this.creditSimulationRepository.save(simulation);
  }

  async getSimulation(id: string): Promise<CreditSimulationOrmEntity | null> {
    return this.creditSimulationRepository.findOneBy({ id });
  }
}