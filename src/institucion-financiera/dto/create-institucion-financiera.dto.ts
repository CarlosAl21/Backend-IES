import { IsNotEmpty, IsString } from "class-validator";

export class CreateInstitucionFinancieraDto {
    @IsString()
    @IsNotEmpty()
    logo: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsString()
    @IsNotEmpty()
    mission: string;

    @IsString()
    @IsNotEmpty()
    vision: string;

    @IsString()
    @IsNotEmpty()
    primaryColor: string;

    @IsString()
    @IsNotEmpty()
    secondaryColor: string;

    @IsString()
    @IsNotEmpty()
    emailAdmin: string;

    @IsString()
    @IsNotEmpty()
    passwordAdmin: string;

    // Optional admin defaults
    @IsString()
    adminName?: string;

    @IsString()
    adminLastname?: string;

    @IsString()
    adminCedula?: string;

    // Accept either ISO date string or similar; optional
    adminBirthdate?: string;

    @IsString()
    adminAddress?: string;

    @IsString()
    adminPhone?: string;
}
