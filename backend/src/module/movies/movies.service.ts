import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { AddMovieDto } from './dto/add-movie.dto';
import { Request } from 'express';
import { convertDate } from 'src/utils/convertDate.utils';
import { convertBoolean } from 'src/utils/convertBoolean.utils';
import { MoviesPerPage } from './dto/movie-per-page.dto';
import { MovieByDateDto } from './dto/movie-by-date.dto';
import { getPage, getPageSize, getTotalPage } from 'src/utils/page.utils';

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
    const page = getPage(moviePerPage.page);

    const pageSize = getPageSize(moviePerPage.pageSize);

    const totalItems = await this.prisma.movies.count();

    const totalPage = getTotalPage(totalItems, pageSize);

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
      totalItems,
      totalPage,
      items: moviesPerPage || [],
    };
  }

  async getMoviesByDates(movieByDate: MovieByDateDto) {
    const page = getPage(movieByDate.page);

    const pageSize = getPageSize(movieByDate.pageSize);

    const totalItems = await this.prisma.movies.count({
      where: {
        releaseDay: {
          gte: new Date(movieByDate.startDate),
          lte: new Date(movieByDate.endDate),
        },
      },
    });

    const totalPage = getTotalPage(totalItems, pageSize);

    const moviesByDate = await this.prisma.movies.findMany({
      where: {
        releaseDay: {
          gte: new Date(movieByDate.startDate),
          lte: new Date(movieByDate.endDate),
        },
      },
      orderBy: {
        releaseDay: `asc`,
      },
    });

    return {
      pageSize,
      page,
      totalItems,
      totalPage,
      items: moviesByDate,
    };
  }

  async updateMovies() {
    return `updateMovies`;
  }
}
