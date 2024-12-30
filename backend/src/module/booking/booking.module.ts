import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from 'src/common/prisma/init.prisma';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
