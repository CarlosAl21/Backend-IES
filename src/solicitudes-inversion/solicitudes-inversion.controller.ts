import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SolicitudesInversionService } from './solicitudes-inversion.service';
import { CreateSolicitudesInversionDto } from './dto/create-solicitudes-inversion.dto';
import { UpdateSolicitudesInversionDto } from './dto/update-solicitudes-inversion.dto';
// añadido swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { SolicitudesInversion } from './entities/solicitudes-inversion.entity';
// interceptor para archivos
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Solicitudes-Inversion')
@Controller('solicitudes-inversion')
export class SolicitudesInversionController {
  constructor(private readonly solicitudesInversionService: SolicitudesInversionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una solicitud de inversión (acepta archivos)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 1000 },
        plazo: { type: 'number', example: 12 },
        motivo: { type: 'string' },
        descripcion: { type: 'string' },
        profesion: { type: 'string' },
        ingresosMensuales: { type: 'string' },
        estado: { type: 'string', enum: ['Pendiente', 'Aprobado', 'Rechazado'] },
        idUser: { type: 'string' },
        idInstitucion: { type: 'string' },
        idInversion: { type: 'string' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Archivos (fotos/documentos) opcionales'
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Solicitud creada', type: SolicitudesInversion })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createSolicitudesInversionDto: CreateSolicitudesInversionDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    return this.solicitudesInversionService.create(createSolicitudesInversionDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes de inversión' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes', type: [SolicitudesInversion] })
  findAll() {
    return this.solicitudesInversionService.findAll();
  }

  @Get('institucion/:idInstitucion')
  @ApiOperation({ summary: 'Obtener todas las solicitudes por ID de la institución financiera' })
  @ApiParam({ name: 'idInstitucion', description: 'ID de la institución financiera' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes de la institución', type: [SolicitudesInversion] })
  findAllByInstitucion(@Param('idInstitucion') idInstitucion: string) {
    return this.solicitudesInversionService.findAllByInstitucion(idInstitucion);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud por id' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud (uuid)' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada', type: SolicitudesInversion })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  findOne(@Param('id') id: string) {
    return this.solicitudesInversionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud de inversión' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud a actualizar' })
  @ApiBody({ type: UpdateSolicitudesInversionDto })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada', type: SolicitudesInversion })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  update(@Param('id') id: string, @Body() updateSolicitudesInversionDto: UpdateSolicitudesInversionDto) {
    return this.solicitudesInversionService.update(id, updateSolicitudesInversionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) una solicitud de inversión' })
  @ApiParam({ name: 'id', description: 'ID de la solicitud a eliminar' })
  @ApiResponse({ status: 200, description: 'Solicitud desactivada correctamente' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  remove(@Param('id') id: string) {
    return this.solicitudesInversionService.remove(id);
  }
}
