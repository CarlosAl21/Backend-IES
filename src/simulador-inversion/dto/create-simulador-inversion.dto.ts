import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSimuladorInversionDto {
    @IsNumber()
    @IsNotEmpty()
    montoSimulado: number;

    @IsNumber()
    @IsNotEmpty()
    plazoSimulado: number;

    @IsDate()
    @IsNotEmpty()
    fechaSimulacion: Date;

    @IsString()
    @IsNotEmpty()
    idTipoInversion: string;
}
