import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNumber()
  movieId: number;

  @ApiProperty()
  @IsDateString()
  showTime: string;

  @ApiProperty()
  @IsNumber()
  cinemaRoomId: number;

  @ApiProperty()
  @IsNumber()
  ticketPrice: number;
}
