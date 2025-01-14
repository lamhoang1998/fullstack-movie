import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  movieName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  trailer: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  desc: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  releaseDate: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  rate: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  hot: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  nowShowing: boolean;

  @ApiProperty()
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
