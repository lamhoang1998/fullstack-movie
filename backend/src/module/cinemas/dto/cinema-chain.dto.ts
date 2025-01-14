import { ApiProperty } from '@nestjs/swagger';

export class CinemaChain {
  @ApiProperty()
  cinema: string;
}

export class CinemaChainId {
  @ApiProperty()
  cinemaId: string;
}

export class MovieId {
  @ApiProperty()
  movieId: string;
}
