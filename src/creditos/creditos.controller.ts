import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { CreateCreditoDto } from './dto/create-credito.dto';
import { UpdateCreditoDto } from './dto/update-credito.dto';
// añadido swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Credito } from './entities/credito.entity';

@ApiTags('Creditos')
@Controller('creditos')
export class CreditosController {
  constructor(private readonly creditosService: CreditosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un crédito' })
  @ApiBody({ type: CreateCreditoDto })
  @ApiResponse({ status: 201, description: 'Crédito creado', type: Credito })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  create(@Body() createCreditoDto: CreateCreditoDto) {
    return this.creditosService.create(createCreditoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los créditos' })
  @ApiResponse({ status: 200, description: 'Lista de créditos', type: [Credito] })
  findAll() {
    return this.creditosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un crédito por id' })
  @ApiParam({ name: 'id', description: 'ID del crédito (uuid)' })
  @ApiResponse({ status: 200, description: 'Crédito encontrado', type: Credito })
  @ApiResponse({ status: 404, description: 'Crédito no encontrado' })
  findOne(@Param('id') id: string) {
    return this.creditosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un crédito' })
  @ApiParam({ name: 'id', description: 'ID del crédito a actualizar' })
  @ApiBody({ type: UpdateCreditoDto })
  @ApiResponse({ status: 200, description: 'Crédito actualizado', type: Credito })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateCreditoDto: UpdateCreditoDto) {
    return this.creditosService.update(id, updateCreditoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) un crédito' })
  @ApiParam({ name: 'id', description: 'ID del crédito a eliminar' })
  @ApiResponse({ status: 200, description: 'Crédito desactivado correctamente' })
  @ApiResponse({ status: 404, description: 'Crédito no encontrado' })
  remove(@Param('id') id: string) {
    return this.creditosService.remove(id);
  }
  
  @Get('institucion/:id')
  @ApiOperation({ summary: 'Obtener créditos por institución financiera' })
  @ApiParam({ name: 'id', description: 'ID de la institución financiera' })
  @ApiResponse({ status: 200, description: 'Lista de créditos de la institución', type: [Credito] })
  findByInstitucion(@Param('id') id: string) {
    return this.creditosService.findByInstitucionFinanciera(id);
  }
}
