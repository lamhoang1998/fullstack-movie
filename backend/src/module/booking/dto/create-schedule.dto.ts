import { IsDateString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  @IsNumber()
  movieId: number;
  @IsDateString()
  showTime: string;
  @IsNumber()
  cinemaRoomId: number;
  @IsNumber()
  ticketPrice: number;
}
