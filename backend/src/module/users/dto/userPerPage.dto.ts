import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserPerPage {
  @ApiProperty()
  @IsString()
  page: string;

  @ApiProperty()
  @IsString()
  pageSize: string;
}
