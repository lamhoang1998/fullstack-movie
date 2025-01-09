import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { CinemaChain, CinemaChainId, MovieId } from './dto/cinema-chain.dto';

@Injectable()
export class CinemasService {
  constructor(public prisma: PrismaService) {}

  async getCinemaChain(cinemaChainName: CinemaChain) {
    const cinemaChain = await this.prisma.cinemachains.findFirst({
      where: {
        cinemaChainName: cinemaChainName.cinema,
      },
    });
    return cinemaChain;
  }

  async getCinemaInfoByChain(cinemaChainId: CinemaChainId) {
    const cinemaInfo = await this.prisma.cinemas.findMany({
      where: { cinemaChainId: +cinemaChainId.cinemaId },
      include: { cinemarooms: true },
    });

    return cinemaInfo;
  }

  async getScheduleByChain(cinemaChain: CinemaChainId) {
    const scheduleByCinemaChainId = await this.prisma.movies.findMany({
      include: {
        schedules: {
          where: {
            cinemarooms: {
              cinemas: {
                cinemaChainId: +cinemaChain.cinemaId, // Filter by cinemaChainId
              },
            },
          },
          include: {
            cinemarooms: {
              include: {
                cinemas: true, // Include valid cinemas
              },
            },
          },
        },
      },
      //using some instead of every in this case to retrieve all movies having schedules that are in cinemas having cinemaChainID equalled to the query, using every we can only retrieve movies that all schedules whose cinemaChainId equalled to query, and that could make us miss some schedules whose cinemaChainId could be equalled to both query or another value.
      where: {
        schedules: {
          some: {
            cinemarooms: {
              cinemas: {
                cinemaChainId: +cinemaChain.cinemaId,
              },
            },
          },
        },
      },
    });
    return scheduleByCinemaChainId;
  }

  async getScheduleInfo(movieId: MovieId) {
    const cinemaSchedulesInfo = await this.prisma.cinemas.findMany({
      include: {
        cinemarooms: {
          include: {
            schedules: {
              where: { movieId: +movieId.movieId },
            },
          },
          where: {
            schedules: {
              some: { movieId: +movieId.movieId }, // Include only rooms with schedules for the movieId
            },
          },
        },
      },
      where: {
        cinemarooms: {
          some: {
            schedules: {
              some: { movieId: +movieId.movieId },
            },
          },
        },
      },
    });

    return cinemaSchedulesInfo;
  }

  async getCinemas() {
    const cinemas = await this.prisma.schedules.findMany({
      select: {
        movies: true,
        cinemarooms: {
          include: {
            cinemas: {
              include: {
                cinemachains: true,
              },
            },
          },
        },
        showtime: true,
        ticketPrice: true,
      },
    });

    return cinemas;
  }
}
