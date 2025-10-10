import { PartialType } from '@nestjs/swagger';
import { CreateSimuladorInversionDto } from './create-simulador-inversion.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSimuladorInversionDto extends PartialType(CreateSimuladorInversionDto) {
    @IsString()
    @IsNotEmpty()
    idSimuladorInversion: string;
}
