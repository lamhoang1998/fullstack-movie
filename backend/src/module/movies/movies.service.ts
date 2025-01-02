import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { AddMovieDto } from './dto/add-movie.dto';
import { Request } from 'express';
import { convertDate } from 'src/utils/convertDate.utils';
import { convertBoolean } from 'src/utils/convertBoolean.utils';
import { MoviesPerPage } from './dto/movie-per-page.dto';

@Injectable()
export class MoviesService {
  constructor(public prisma: PrismaService) {}

  async addMovie(
    file: Express.Multer.File,
    movieBody: AddMovieDto,
    req: Request,
  ) {
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
    return newMovie;
  }

  async getMovies() {
    const movies = this.prisma.movies.findMany();
    return movies;
  }

  async getMoviesPerPage(moviePerPage: MoviesPerPage) {
    const page = moviePerPage.page ? +moviePerPage.page : 1;
    const pageSize = moviePerPage.pageSize ? +moviePerPage.pageSize : 3;

    const totalItem = await this.prisma.movies.count();

    const totalPage = Math.ceil(totalItem / pageSize);

    const moviesPerPage = await this.prisma.movies.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        created_at: `desc`,
      },
    });

    return {
      pageSize,
      page,
      totalItem,
      totalPage,
      items: moviesPerPage || [],
    };
  }
}
