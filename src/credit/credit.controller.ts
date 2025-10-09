import { AmortizationTableOrmEntity } from './entities/amortization-table.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreditService } from './credit.service';
import { CreateCreditTypeDto, CreateCreditSimulationDto } from './dto';

@ApiTags('Créditos')
@Controller('credit')
export class CreditController {
  constructor(
    private readonly creditService: CreditService,
    @InjectRepository(AmortizationTableOrmEntity)
    private readonly amortizationTableRepository: Repository<AmortizationTableOrmEntity>,
  ) {}
  // --- CRUD Tabla_Amortizacion_Simulada ---
  @Post('amortization-table')
  createAmortization(@Body() dto: Partial<AmortizationTableOrmEntity>) {
    const entity = this.amortizationTableRepository.create(dto);
    return this.amortizationTableRepository.save(entity);
  }

  @Get('amortization-table')
  findAllAmortization() {
    return this.amortizationTableRepository.find();
  }

  @Get('amortization-table/:id')
  findOneAmortization(@Param('id') id: string) {
    return this.amortizationTableRepository.findOneBy({ id });
  }

  @Put('amortization-table/:id')
  async updateAmortization(@Param('id') id: string, @Body() dto: Partial<AmortizationTableOrmEntity>) {
    await this.amortizationTableRepository.update(id, dto);
    return this.amortizationTableRepository.findOneBy({ id });
  }

  @Delete('amortization-table/:id')
  removeAmortization(@Param('id') id: string) {
    return this.amortizationTableRepository.delete(id);
  }

  @Post('type')
  @ApiOperation({ summary: 'Crear un tipo de crédito' })
  @ApiBody({ type: CreateCreditTypeDto })
  @ApiResponse({ status: 201, description: 'Tipo de crédito creado' })
  createCreditType(@Body() dto: CreateCreditTypeDto) {
    return this.creditService.createCreditType(dto);
  }

  @Get('type')
  @ApiOperation({ summary: 'Listar tipos de crédito' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de crédito' })
  findAllCreditTypes() {
    return this.creditService.findAllCreditTypes();
  }

  @Post('simulate')
  @ApiOperation({ summary: 'Simular un crédito' })
  @ApiBody({ type: CreateCreditSimulationDto })
  @ApiResponse({ status: 201, description: 'Simulación de crédito creada' })
  simulateCredit(@Body() dto: CreateCreditSimulationDto) {
    return this.creditService.simulateCredit(dto);
  }

  @Get('simulation/:id')
  @ApiOperation({ summary: 'Obtener una simulación de crédito por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Simulación encontrada' })
  getSimulation(@Param('id') id: string) {
    return this.creditService.getSimulation(id);
  }
}
