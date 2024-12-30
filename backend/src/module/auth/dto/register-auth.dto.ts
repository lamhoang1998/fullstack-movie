import { IsOptional } from 'class-validator';

export class RegisterDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;

  @IsOptional()
  role_id: number;
}
