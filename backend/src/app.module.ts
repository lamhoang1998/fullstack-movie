import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';
import { AuthService } from './module/auth/auth.service';
import { PrismaService } from './common/prisma/init.prisma';
import { JwtService } from '@nestjs/jwt';
import { UploadModule } from './module/upload/upload.module';
import { BookingModule } from './module/booking/booking.module';
import { MoviesModule } from './module/movies/movies.module';
import { UsersModule } from './module/users/users.module';
import { CinemasModule } from './module/cinemas/cinemas.module';

@Module({
  imports: [AuthModule, UploadModule, BookingModule, MoviesModule, UsersModule, CinemasModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService, JwtService],
})
export class AppModule {}
