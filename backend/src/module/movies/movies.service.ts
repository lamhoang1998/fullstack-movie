import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { AddMovieDto } from './dto/add-movie.dto';
import { Request } from 'express';
import { convertDate } from 'src/utils/convertDate.utils';
import { convertBoolean } from 'src/utils/convertBoolean.utils';

@Injectable()
export class MoviesService {
  constructor(public prisma: PrismaService) {}

  async addMovie(
    file: Express.Multer.File,
    movieBody: AddMovieDto,
    req: Request,
  ) {
    console.log({ file });
    console.log({ movieBody });
    const releaseDate = convertDate(movieBody.releaseDate);

    const newMovie = await this.prisma.movies.create({
      data: {
        movieName: movieBody.movieName,
        trailer: movieBody.trailer,
        images: file.filename,
        desc: movieBody.desc,
        releaseDay: releaseDate,
        rate: +movieBody.rate,
        hot: movieBody.hot,
        nowShowing: movieBody.nowShowing,
        comingSoon: movieBody.comingSoon,
      },
    });
    return `movie`;
  }
}
