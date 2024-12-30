import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ResponseMessage(`successfully created schedule`)
  @Post(`create-schedule`)
  CreateSchedule(@Body() createSchedule: CreateScheduleDto) {
    console.log({ createSchedule });
    return this.bookingService.createSchedule(createSchedule);
  }
}
