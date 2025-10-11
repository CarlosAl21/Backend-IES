import { PartialType } from '@nestjs/swagger';
import { CreateInstitucionFinancieraDto } from './create-institucion-financiera.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstitucionFinancieraDto extends PartialType(CreateInstitucionFinancieraDto) {
    @ApiProperty({ description: 'ID de la institución (uuid)', example: 'uuid-institucion' })
    @IsString()
    @IsNotEmpty()
    idInstitucionFinanciera: string;
    
}
