import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { CinemaChain, CinemaChainId } from './dto/cinema-chain.dto';

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
