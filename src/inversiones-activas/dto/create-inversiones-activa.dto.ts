import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInversionesActivaDto {
    @IsNumber()
    @IsNotEmpty()
    montoInvertido: number;

    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    fechaVencimiento: Date;

    @IsNumber()
    @IsNotEmpty()
    tasaRendimiento: number;

    @IsString()
    @IsNotEmpty()
    idTipoInversion: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;

}
