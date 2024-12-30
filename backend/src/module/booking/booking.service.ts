import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Injectable()
export class BookingService {
  constructor(public prisma: PrismaService) {}
  async createSchedule(createSchedule: CreateScheduleDto) {
    console.log({ createSchedule });
    const showTimeDate = new Date(createSchedule.showTime);
    await this.prisma.schedules.create({
      data: {
        cinemaRoomId: createSchedule.cinemaRoomId,
        movieId: createSchedule.movieId,
        showtime: showTimeDate,
        ticketPrice: createSchedule.ticketPrice,
      },
    });
    return `ok`;
  }
}
