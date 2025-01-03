import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AddMovieDto } from './dto/add-movie.dto';
import storageImageCloud from 'src/common/multer/upload-image-cloud.multer';
import { Request } from 'express';
import { MoviesPerPage } from './dto/movie-per-page.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { MovieByDateDto } from './dto/movie-by-date.dto';
import { MovieQueryDto, UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.Admin)
  @Post(`add-movies`)
  @UseInterceptors(FileInterceptor('images', { storage: storageImageCloud }))
  addMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() movieBody: AddMovieDto,
    @Req() req: Request,
  ) {
    return this.moviesService.addMovie(file, movieBody, req);
  }

  @Get(`get-movies`)
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Get(`get-movies-per-page`)
  getMoviesPerPage(@Query() moviePerPage: MoviesPerPage) {
    return this.moviesService.getMoviesPerPage(moviePerPage);
  }

  @Get(`get-movies-by-date`)
  getMoviesByDates(@Query() movieByDate: MovieByDateDto) {
    return this.moviesService.getMoviesByDates(movieByDate);
  }

  @Roles(Role.Admin)
  @Put(`update-movies`)
  @UseInterceptors(FileInterceptor('images', { storage: storageImageCloud }))
  updateMovies(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() movieBody: UpdateMovieDto,
    @Req() req: Request,
    @Query() movie: MovieQueryDto,
  ) {
    return this.moviesService.updateMovies(file, movieBody, req, movie);
  }
}
