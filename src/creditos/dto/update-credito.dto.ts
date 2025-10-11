import { PartialType } from '@nestjs/swagger';
import { CreateCreditoDto } from './create-credito.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCreditoDto extends PartialType(CreateCreditoDto) {
    @ApiProperty({ description: 'ID del crédito (uuid)', example: 'uuid-credito' })
    @IsString()
    @IsNotEmpty()
    idCredito: string;
}
