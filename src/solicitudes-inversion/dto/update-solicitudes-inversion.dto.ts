import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudesInversionDto } from './create-solicitudes-inversion.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSolicitudesInversionDto extends PartialType(CreateSolicitudesInversionDto) {
    @ApiProperty({ description: 'ID de la solicitud (uuid)', example: 'uuid-solicitud' })
    @IsString()
    @IsNotEmpty()
    idSolicitud: string;
}
