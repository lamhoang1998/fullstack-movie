import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MovieByDateDto {
  @ApiProperty()
  @IsString()
  page: string;

  @ApiProperty()
  @IsString()
  pageSize: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;
}
