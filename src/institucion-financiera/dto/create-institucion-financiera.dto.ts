import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstitucionFinancieraDto {
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

  //Datos del Admin

  @IsString()
  @IsNotEmpty()
  firstNameAdmin: string;

  @IsString()
  @IsNotEmpty()
  lastNameAdmin: string;

  @IsString()
  @IsNotEmpty()
  secondNameAdmin: string;

  @IsString()
  @IsNotEmpty()
  secondLastNameAdmin: string;

  @IsString()
  @IsNotEmpty()
  phoneAdmin: string;

  @IsString()
  @IsNotEmpty()
  homePhoneAdmin: string;

  @IsString()
  @IsNotEmpty()
  cedulaAdmin: string;

  @IsString()
  @IsNotEmpty()
  emailAdmin: string;

  @IsString()
  @IsNotEmpty()
  passwordAdmin: string;
}
