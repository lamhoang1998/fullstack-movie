import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  movieName: string;

  @IsString()
  @IsOptional()
  trailer: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  releaseDate: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  rate: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  hot: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  nowShowing: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  comingSoon: boolean;
}

export class MovieQueryDto {
  @IsNotEmpty()
  @IsString()
  movieId: string;
}
