import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndirectChargeOrmEntity } from '../credit/entities/indirect-charge.orm-entity';

@Controller('insurance/indirect-charge')
export class InsuranceController {
  constructor(
    @InjectRepository(IndirectChargeOrmEntity)
    private readonly indirectChargeRepository: Repository<IndirectChargeOrmEntity>,
  ) {}

  @Post()
  create(@Body() dto: Partial<IndirectChargeOrmEntity>) {
    const entity = this.indirectChargeRepository.create(dto);
    return this.indirectChargeRepository.save(entity);
  }

  @Get()
  findAll() {
    return this.indirectChargeRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indirectChargeRepository.findOneBy({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<IndirectChargeOrmEntity>) {
    await this.indirectChargeRepository.update(id, dto);
    return this.indirectChargeRepository.findOneBy({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indirectChargeRepository.delete(id);
  }
}
