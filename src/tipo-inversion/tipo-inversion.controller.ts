import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoInversionService } from './tipo-inversion.service';
import { CreateTipoInversionDto } from './dto/create-tipo-inversion.dto';
import { UpdateTipoInversionDto } from './dto/update-tipo-inversion.dto';

@Controller('tipo-inversion')
export class TipoInversionController {
  constructor(private readonly tipoInversionService: TipoInversionService) {}

  @Post()
  create(@Body() createTipoInversionDto: CreateTipoInversionDto) {
    return this.tipoInversionService.create(createTipoInversionDto);
  }

  @Get()
  findAll() {
    return this.tipoInversionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoInversionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoInversionDto: UpdateTipoInversionDto) {
    return this.tipoInversionService.update(id, updateTipoInversionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoInversionService.remove(id);
  }
}
