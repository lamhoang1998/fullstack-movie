import { IsString } from 'class-validator';

export class MovieByDateDto {
  @IsString()
  page: string;

  @IsString()
  pageSize: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}
