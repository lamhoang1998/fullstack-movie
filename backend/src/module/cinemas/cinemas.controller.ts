import { Controller, Get, Query } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemaChain, CinemaChainId } from './dto/cinema-chain.dto';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Get(`get-cinema-chain-info`)
  getCinemaChain(@Query() cinemaChain: CinemaChain) {
    return this.cinemasService.getCinemaChain(cinemaChain);
  }

  @Get(`get-cinema-info-by-chain`)
  getCinemaInfoByChain(@Query() CinemaChainId: CinemaChainId) {
    return this.cinemasService.getCinemaInfoByChain(CinemaChainId);
  }

  @Get(`get-cinemas`)
  getCinema() {
    return this.cinemasService.getCinemas();
  }
}
