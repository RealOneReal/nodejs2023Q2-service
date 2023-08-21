import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  UnprocessableEntityException,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from './logger/logging.service';

@Catch(
  HttpException,
  NotFoundException,
  UnprocessableEntityException,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    this.loggingService.error(message, exception);

    if (status === 500) {
      response.status(status).json({
        statusCode: status,
        message: 'Oops, something went wrong',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
}
