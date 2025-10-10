import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SimuladorInversionService } from './simulador-inversion.service';
import { CreateSimuladorInversionDto } from './dto/create-simulador-inversion.dto';
import { UpdateSimuladorInversionDto } from './dto/update-simulador-inversion.dto';

@Controller('simulador-inversion')
export class SimuladorInversionController {
  constructor(private readonly simuladorInversionService: SimuladorInversionService) {}

  @Post()
  create(@Body() createSimuladorInversionDto: CreateSimuladorInversionDto) {
    return this.simuladorInversionService.create(createSimuladorInversionDto);
  }

  @Get()
  findAll() {
    return this.simuladorInversionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simuladorInversionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSimuladorInversionDto: UpdateSimuladorInversionDto) {
    return this.simuladorInversionService.update(id, updateSimuladorInversionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simuladorInversionService.remove(id);
  }
}
