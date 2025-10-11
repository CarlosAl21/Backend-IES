import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InversionesService } from './inversiones.service';
import { CreateInversioneDto } from './dto/create-inversione.dto';
import { UpdateInversioneDto } from './dto/update-inversione.dto';
// añadido swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Inversiones } from './entities/inversione.entity';

@ApiTags('Inversiones')
@Controller('inversiones')
export class InversionesController {
  constructor(private readonly inversionesService: InversionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una inversión' })
  @ApiBody({ type: CreateInversioneDto })
  @ApiResponse({ status: 201, description: 'Inversión creada', type: Inversiones })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  create(@Body() createInversioneDto: CreateInversioneDto) {
    return this.inversionesService.create(createInversioneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las inversiones' })
  @ApiResponse({ status: 200, description: 'Lista de inversiones', type: [Inversiones] })
  findAll() {
    return this.inversionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una inversión por id' })
  @ApiParam({ name: 'id', description: 'ID de la inversión (uuid)' })
  @ApiResponse({ status: 200, description: 'Inversión encontrada', type: Inversiones })
  @ApiResponse({ status: 404, description: 'Inversión no encontrada' })
  findOne(@Param('id') id: string) {
    return this.inversionesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una inversión' })
  @ApiParam({ name: 'id', description: 'ID de la inversión a actualizar' })
  @ApiBody({ type: UpdateInversioneDto })
  @ApiResponse({ status: 200, description: 'Inversión actualizada', type: Inversiones })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateInversioneDto: UpdateInversioneDto) {
    return this.inversionesService.update(id, updateInversioneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) una inversión' })
  @ApiParam({ name: 'id', description: 'ID de la inversión a eliminar' })
  @ApiResponse({ status: 200, description: 'Inversión desactivada correctamente' })
  @ApiResponse({ status: 404, description: 'Inversión no encontrada' })
  remove(@Param('id') id: string) {
    return this.inversionesService.remove(id);
  }

  @Get('institucion/:id')
  @ApiOperation({ summary: 'Obtener inversiones por institución financiera' })
  @ApiParam({ name: 'id', description: 'ID de la institución financiera' })
  @ApiResponse({ status: 200, description: 'Lista de inversiones de la institución', type: [Inversiones] })
  findByInstitucion(@Param('id') id: string) {
    return this.inversionesService.findByInstitucionFinanciera(id);
  }
}
