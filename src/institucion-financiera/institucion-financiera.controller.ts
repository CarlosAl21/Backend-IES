import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { InstitucionFinancieraService } from './institucion-financiera.service';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
// añadido swagger
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { InstitucionFinanciera } from './entities/institucion-financiera.entity';
// interceptor para archivos
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Institucion-Financiera')
@ApiBearerAuth()
@Controller('institucion-financiera')
export class InstitucionFinancieraController {
  constructor(private readonly institucionFinancieraService: InstitucionFinancieraService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una institución financiera (acepta logo/archivos)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        mission: { type: 'string' },
        vision: { type: 'string' },
        primaryColor: { type: 'string' },
        secondaryColor: { type: 'string' },
        firstNameAdmin: { type: 'string' },
        lastNameAdmin: { type: 'string' },
        secondNameAdmin: { type: 'string' },
        secondLastNameAdmin: { type: 'string' },
        phoneAdmin: { type: 'string' },
        homePhoneAdmin: { type: 'string' },
        cedulaAdmin: { type: 'string' },
        emailAdmin: { type: 'string' },
        passwordAdmin: { type: 'string' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Logo o archivos opcionales'
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Institución creada', type: InstitucionFinanciera })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createInstitucionFinancieraDto: CreateInstitucionFinancieraDto, @UploadedFiles() files?: Array<Express.Multer.File>) {
    return this.institucionFinancieraService.create(createInstitucionFinancieraDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las instituciones financieras' })
  @ApiResponse({ status: 200, description: 'Lista de instituciones', type: [InstitucionFinanciera] })
  findAll() {
    return this.institucionFinancieraService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una institución por id' })
  @ApiParam({ name: 'id', description: 'ID de la institución (uuid)' })
  @ApiResponse({ status: 200, description: 'Institución encontrada', type: InstitucionFinanciera })
  @ApiResponse({ status: 404, description: 'Institución no encontrada' })
  findOne(@Param('id') id: string) {
    return this.institucionFinancieraService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una institución financiera' })
  @ApiParam({ name: 'id', description: 'ID de la institución a actualizar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        mission: { type: 'string' },
        vision: { type: 'string' },
        primaryColor: { type: 'string' },
        secondaryColor: { type: 'string' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Logo o archivos opcionales para actualizar'
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Institución actualizada', type: InstitucionFinanciera })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    return this.institucionFinancieraService.update(id, updateInstitucionFinancieraDto, files);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) una institución financiera' })
  @ApiParam({ name: 'id', description: 'ID de la institución a eliminar' })
  @ApiResponse({ status: 200, description: 'Institución desactivada correctamente' })
  @ApiResponse({ status: 404, description: 'Institución no encontrada' })
  remove(@Param('id') id: string) {
    return this.institucionFinancieraService.remove(id);
  }
}
