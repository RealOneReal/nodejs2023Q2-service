import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logger/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    const { query, body } = req;

    res.send = (...args) => {
      const logMessage = `URL: ${req.url}, QUERY: ${JSON.stringify(
        query,
      )}, BODY:${JSON.stringify(body)}) and status code ${res.statusCode}`;
      this.loggingService.log(logMessage, 'info');

      return originalSend.call(res, ...args);
    };

    next();
  }
}
