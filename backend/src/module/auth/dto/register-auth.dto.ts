import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({
    description:
      'its optional, when you want to create an account being an admin, just give 1, just omit it when you want to create a normal user account',
  })
  @IsOptional()
  @IsNumber()
  role_id: number;
}
