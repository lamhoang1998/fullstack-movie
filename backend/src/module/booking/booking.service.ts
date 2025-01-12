import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { TicketListDto } from './dto/booking-ticket.dto';
import { Request } from 'express';
import { ScheduleIdDto } from './dto/ticket-list.dto';

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

  async bookingTicket(bookingTicketBody: TicketListDto, req: Request) {
    const ticketBooked = await this.prisma.$transaction(
      async (prisma) => {
        const bookings = [];
        for (const ticket of bookingTicketBody.ticketList) {
          const booking = await prisma.booking.create({
            data: {
              userId: req.user.userId, // From request
              scheduleId: bookingTicketBody.scheduleId, // Common for all tickets
              seatId: ticket.seatId,
            },
          });
          bookings.push(booking); // Save each created booking
        }

        console.log({ bookings });

        const seatIds = bookingTicketBody.ticketList.map(
          (ticket) => ticket.seatId,
        );
        const updatedSeats = await prisma.seats.updateMany({
          where: {
            seatId: { in: seatIds },
            seatType: { not: 'booked' },
          },
          data: {
            seatType: 'booked',
          },
        });

        return { bookings };
      },
      // {
      //   maxWait: 5000,
      //   timeout: 10000,
      // },
    );

    return ticketBooked;

    // const seatIds = bookingTicketBody.ticketList.map((ticket) => ticket.seatId);

    // const ticketBooked = await this.prisma.$transaction([
    //   // Create booking entries for each ticket
    //   this.prisma.booking.createMany({
    //     data: bookingTicketBody.ticketList.map((ticket) => ({
    //       userId: req.user.userId, // Add userId from the request
    //       scheduleId: bookingTicketBody.scheduleId, // Use the scheduleId
    //       seatId: ticket.seatId, // Add the seatId
    //     })),
    //   }),

    //   // Update seats to mark them as booked
    //   this.prisma.seats.updateMany({
    //     where: {
    //       seatId: { in: seatIds },
    //       seatType: { not: 'booked' }, // Ensure seat isn't already booked
    //     },
    //     data: {
    //       seatType: 'booked', // Mark as booked
    //     },
    //   }),
    // ]);

    // return ticketBooked;
  }

  async ticketLists(scheduleId: ScheduleIdDto) {
    const ticketLists = await this.prisma.schedules.findFirst({
      where: {
        scheduleId: +scheduleId.scheduleId,
      },
      include: {
        cinemarooms: {
          include: { seats: true },
        },
      },
    });
    return ticketLists;
  }
}
