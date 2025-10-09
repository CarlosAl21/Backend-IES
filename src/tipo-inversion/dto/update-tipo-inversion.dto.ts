import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoInversionDto } from './create-tipo-inversion.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTipoInversionDto extends PartialType(CreateTipoInversionDto) {
    @IsString()
    @IsNotEmpty()
    idTipoInversion: string;
}
