import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddMovieDto {
  @ApiProperty()
  @IsString()
  movieName: string;

  @ApiProperty()
  @IsString()
  trailer: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  images: any;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsString()
  releaseDate: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  rate: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  hot: boolean;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  nowShowing: boolean;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error('Invalid boolean value');
  })
  comingSoon: boolean;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
