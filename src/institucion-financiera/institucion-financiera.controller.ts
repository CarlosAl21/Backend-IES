import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitucionFinancieraService } from './institucion-financiera.service';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';

@Controller('institucion-financiera')
export class InstitucionFinancieraController {
  constructor(private readonly institucionFinancieraService: InstitucionFinancieraService) {}

  @Post()
  create(@Body() createInstitucionFinancieraDto: CreateInstitucionFinancieraDto) {
    return this.institucionFinancieraService.create(createInstitucionFinancieraDto);
  }

  @Get()
  findAll() {
    return this.institucionFinancieraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institucionFinancieraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto) {
    return this.institucionFinancieraService.update(+id, updateInstitucionFinancieraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.institucionFinancieraService.remove(+id);
  }
}
