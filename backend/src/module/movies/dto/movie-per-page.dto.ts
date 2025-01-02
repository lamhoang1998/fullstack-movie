import { IsNotEmpty } from 'class-validator';

export class MoviesPerPage {
  @IsNotEmpty()
  page: string;

  @IsNotEmpty()
  pageSize: string;
}
