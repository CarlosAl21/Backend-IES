import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreditService } from './credit.service';
import { CreateCreditTypeDto, CreateCreditSimulationDto } from './dto';

@ApiTags('Créditos')
@Controller('credit')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

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
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Simulación encontrada' })
  getSimulation(@Param('id') id: number) {
    return this.creditService.getSimulation(id);
  }
}
