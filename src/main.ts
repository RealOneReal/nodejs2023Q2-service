import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logger/logging.service';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const logger = new LoggingService();

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error);
  });

  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Rejection', reason);
  });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(LoggingService));
  app.useGlobalFilters(new HttpExceptionFilter(new LoggingService()));
  await app.listen(process.env.APP_PORT || 4000);
}
bootstrap();
