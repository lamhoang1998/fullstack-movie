import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { responseError } from '../helpers/response.helper';

type ExceptionType = HttpException | Error | any;

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: ExceptionType, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = 500;
    let message = `Internal Server Error`;
    let errorResponse: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object') {
        message = (errorResponse as any).message;
      }
    }

    console.log({ message });
    console.log({ exception });
    const result = responseError(message, status, exception?.stack);

    response.status(status).json(result);
  }
}
