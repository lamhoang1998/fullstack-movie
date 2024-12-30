import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddMovieDto {
  @IsString()
  movieName: string;

  @IsString()
  trailer: string;

  @IsString()
  desc: string;

  @IsString()
  releaseDate: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  rate: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  hot: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  nowShowing: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  comingSoon: boolean;
}
