import { PartialType } from '@nestjs/swagger';
import { CreateInversionesActivaDto } from './create-inversiones-activa.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateInversionesActivaDto extends PartialType(CreateInversionesActivaDto) {
    @IsString()
    @IsNotEmpty()
    idInversionActiva: string;
}
