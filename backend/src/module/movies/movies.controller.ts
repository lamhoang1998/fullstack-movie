import {
  Body,
  Controller,
  Get,
  Post,
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

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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
  getMoviesPerPage() {
    return this.moviesService.getMoviesPerPage();
  }
}
