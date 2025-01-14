import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteMovieDto {
  @ApiProperty()
  @IsString()
  movieId: string;
}
