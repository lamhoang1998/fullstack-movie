import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/init.prisma';
import { AddMovieDto } from './dto/add-movie.dto';
import { Request } from 'express';
import { convertDate } from 'src/utils/convertDate.utils';
import { convertBoolean } from 'src/utils/convertBoolean.utils';
import { MoviesPerPage } from './dto/movie-per-page.dto';
import { MovieByDateDto } from './dto/movie-by-date.dto';
import { getPage, getPageSize, getTotalPage } from 'src/utils/page.utils';
import { MovieQueryDto, UpdateMovieDto } from './dto/update-movie.dto';
import { deleteCloudImage } from 'src/common/multer/upload-image-cloud.multer';
import { DeleteMovieDto } from './dto/delete-movie.dto';

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

  async updateMovies(
    file: Express.Multer.File,
    movieBody: UpdateMovieDto,
    req: Request,
    movie: MovieQueryDto,
  ) {
    const movieById = await this.prisma.movies.findUnique({
      where: {
        movieId: +movie.movieId,
      },
    });

    if (file) deleteCloudImage(movieById.images);

    const movieName = movieBody.movieName
      ? movieBody.movieName
      : movieById.movieName;
    const trailer = movieBody.trailer ? movieBody.trailer : movieById.trailer;
    const images = file ? file.filename : movieById.images;
    const desc = movieBody.desc ? movieBody.desc : movieById.desc;
    const releaseDate = movieBody.releaseDate
      ? convertDate(movieBody.releaseDate)
      : movieById.releaseDay;
    const rate = movieBody.rate;
    const hot = movieBody.hot === undefined ? movieById.hot : movieBody.hot;
    const nowShowing =
      movieBody.nowShowing == undefined
        ? movieById.nowShowing
        : movieBody.nowShowing;
    const comingSoon =
      movieBody.comingSoon === undefined
        ? movieById.comingSoon
        : movieBody.comingSoon;

    const updatedMovie = await this.prisma.movies.update({
      where: {
        movieId: +movie.movieId,
      },
      data: {
        movieName: movieName,
        trailer: trailer,
        images: images,
        desc: desc,
        releaseDay: releaseDate,
        rate: rate,
        hot: hot,
        nowShowing: nowShowing,
        comingSoon: comingSoon,
      },
    });

    return updatedMovie;
  }

  async DeleteMovies(movieId: DeleteMovieDto) {
    const deleteMovie = this.prisma.movies.delete({
      where: { movieId: +movieId.movieId },
    });
    return deleteMovie;
  }
}
