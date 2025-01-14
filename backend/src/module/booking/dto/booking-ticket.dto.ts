import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

export class TicketListArrayDto {
  @ApiProperty({ description: 'ID of the seat' })
  @IsNumber()
  seatId: number;
}

export class TicketListDto {
  @ApiProperty()
  @IsNumber()
  scheduleId: number;

  @ApiProperty({
    type: [TicketListArrayDto],
    description: 'List of tickets, each containing seatId',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketListArrayDto)
  ticketList: TicketListArrayDto[];
}
