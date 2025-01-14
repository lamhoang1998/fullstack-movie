import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUser {
  @ApiProperty()
  @IsString()
  userId: string;
}
