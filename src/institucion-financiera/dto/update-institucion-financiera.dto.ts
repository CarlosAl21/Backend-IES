import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitucionFinancieraDto } from './create-institucion-financiera.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInstitucionFinancieraDto extends PartialType(CreateInstitucionFinancieraDto) {
    @IsString()
    @IsNotEmpty()
    idInstitucionFinanciera: string;
    
}
