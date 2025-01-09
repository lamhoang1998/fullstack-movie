import { Body, Controller, Post, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TicketListDto } from './dto/booking-ticket.dto';
import { Request } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ResponseMessage(`successfully created schedule`)
  @Post(`create-schedule`)
  CreateSchedule(@Body() createSchedule: CreateScheduleDto) {
    console.log({ createSchedule });
    return this.bookingService.createSchedule(createSchedule);
  }

  @Post(`booking-ticket`)
  bookingTicket(@Body() bookingTicketBody: TicketListDto, @Req() req: Request) {
    console.log(bookingTicketBody);
    return this.bookingService.bookingTicket(bookingTicketBody, req);
  }
}
