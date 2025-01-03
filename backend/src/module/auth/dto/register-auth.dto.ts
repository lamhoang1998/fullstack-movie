import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;
  @IsString()
  email: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  password: string;

  @IsOptional()
  role_id: number;
}
