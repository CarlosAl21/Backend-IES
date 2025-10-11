import { PartialType } from '@nestjs/swagger';
import { CreateInversioneDto } from './create-inversione.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInversioneDto extends PartialType(CreateInversioneDto) {
    @ApiProperty({ description: 'ID de la institución financiera (uuid) asociada', example: 'uuid-institucion' })
    @IsString()
    @IsNotEmpty()
    idInstitucionFinanciera: string;
}
