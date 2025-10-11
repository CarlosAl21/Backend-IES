import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'token-uuid' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'NewStrongPassword1!' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
