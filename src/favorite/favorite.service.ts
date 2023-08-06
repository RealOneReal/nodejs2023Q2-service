import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.favorite.findMany({
      include: {
        artists: {
          select: {
            artist: true,
          },
        },
        tracks: {
          select: {
            track: true,
          },
        },
        albums: {
          select: {
            album: true,
          },
        },
      },
    });
  }

  async addTrack(id: string) {
    // Найдите трек с заданным идентификатором
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (!track) {
      console.log('Трек с идентификатором', id, 'не найден');
      return null;
    }

    console.log('Трек найден:', track);

    // Убедитесь, что запись избранного с идентификатором 'common' существует
    let favorite = await this.prismaService.favorite.findUnique({
      where: { id: 'common' },
    });
    if (!favorite) {
      favorite = await this.prismaService.favorite.create({
        data: { id: 'common' },
      });
    }

    console.log('Запись в Favorite найдена или создана:', favorite);

    // Создайте связь между треком и записью избранного в таблице 'TrackFavorite'
    try {
      const trackFavoriteWhere = {
        trackId: id,
        favoriteId: 'common',
      };

      const existingTrackFavorite =
        await this.prismaService.trackFavorite.findFirst({
          where: trackFavoriteWhere,
        });

      if (existingTrackFavorite) {
        console.log(
          'Существующая запись в TrackFavorite:',
          existingTrackFavorite,
        );
        return track;
      }

      const createdTrackFavorite =
        await this.prismaService.trackFavorite.create({
          data: trackFavoriteWhere,
        });

      console.log('Создана запись в TrackFavorite:', createdTrackFavorite);
      return track;
    } catch (error) {
      console.error(
        'Ошибка при создании связи между треком и избранным:',
        error,
      );
      return null;
    }
  }

  async addAlbum(id: string) {
    return null;
  }

  async addArtist(id: string) {
    return null;
  }

  async removeTrack(id: string) {
    return null;
  }

  async removeArtist(id: string) {
    return null;
  }

  async removeAlbum(id: string) {
    return null;
  }
}
