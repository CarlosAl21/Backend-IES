import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTipoInversionDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    tasaRendimientoAnual: number;

    @IsNotEmpty()
    plazoMinimoMeses: number;

    @IsNotEmpty()
    montoMinimo: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsNotEmpty()
    riesgo: string;

    @IsString()
    @IsNotEmpty()
    idInstitucionFinanciera: string;

}
