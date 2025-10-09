import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstitucionFinancieraService } from './institucion-financiera.service';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('institucion-financiera')
export class InstitucionFinancieraController {
  constructor(private readonly institucionFinancieraService: InstitucionFinancieraService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('SuperAdmin')
  create(@Body() createInstitucionFinancieraDto: CreateInstitucionFinancieraDto) {
    return this.institucionFinancieraService.create(createInstitucionFinancieraDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('SuperAdmin')
  findAll() {
    return this.institucionFinancieraService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('SuperAdmin')
  findOne(@Param('id') id: string) {
    return this.institucionFinancieraService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('SuperAdmin')
  update(@Param('id') id: string, @Body() updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto) {
    return this.institucionFinancieraService.update(id, updateInstitucionFinancieraDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('SuperAdmin')
  remove(@Param('id') id: string) {
    return this.institucionFinancieraService.remove(id);
  }
}
