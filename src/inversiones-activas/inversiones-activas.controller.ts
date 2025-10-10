import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InversionesActivasService } from './inversiones-activas.service';
import { CreateInversionesActivaDto } from './dto/create-inversiones-activa.dto';
import { UpdateInversionesActivaDto } from './dto/update-inversiones-activa.dto';

@Controller('inversiones-activas')
export class InversionesActivasController {
  constructor(private readonly inversionesActivasService: InversionesActivasService) {}

  @Post()
  create(@Body() createInversionesActivaDto: CreateInversionesActivaDto) {
    return this.inversionesActivasService.create(createInversionesActivaDto);
  }

  @Get()
  findAll() {
    return this.inversionesActivasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inversionesActivasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInversionesActivaDto: UpdateInversionesActivaDto) {
    return this.inversionesActivasService.update(id, updateInversionesActivaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inversionesActivasService.remove(id);
  }
}
