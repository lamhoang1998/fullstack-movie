import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class TicketListDto {
  @IsNumber()
  scheduleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketListArrayDto)
  ticketList: TicketListArrayDto[];
}

export class TicketListArrayDto {
  @IsNumber()
  seatId: number;
}
