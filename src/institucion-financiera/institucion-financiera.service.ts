import { Injectable } from '@nestjs/common';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';

@Injectable()
export class InstitucionFinancieraService {
  create(createInstitucionFinancieraDto: CreateInstitucionFinancieraDto) {
    return 'This action adds a new institucionFinanciera';
  }

  findAll() {
    return `This action returns all institucionFinanciera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institucionFinanciera`;
  }

  update(id: number, updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto) {
    return `This action updates a #${id} institucionFinanciera`;
  }

  remove(id: number) {
    return `This action removes a #${id} institucionFinanciera`;
  }
}
