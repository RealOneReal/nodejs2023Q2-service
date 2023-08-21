import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingService } from './logger/logging.service';
import { LoggingMiddleware } from './logging.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    PrismaModule,
    ConfigModule.forRoot(),
    LoggingService,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingService, LoggingMiddleware, JwtMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(JwtMiddleware)
      .exclude(
        { path: 'auth/signup', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'doc', method: RequestMethod.GET },
        { path: '', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
