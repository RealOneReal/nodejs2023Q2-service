import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.favorite.findMany();
  }

  async addTrack(id: string) {
    const track = await this.prismaService.track.findUnique({ where: { id } });
    track &&
      this.prismaService.favorite.update({
        where: { id: 'commmon' },
        data: { tracks: { connect: { id } } },
      });
    return track;
  }

  async addArtist(id: string) {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });
    artist &&
      this.prismaService.favorite.update({
        where: { id: 'commmon' },
        data: { artists: { connect: { id } } },
      });
    return artist;
  }

  async addAlbum(id: string) {
    const album = await this.prismaService.artist.findUnique({
      where: { id },
    });
    album &&
      this.prismaService.favorite.update({
        where: { id: 'commmon' },
        data: { albums: { connect: { id } } },
      });
    return album;
  }

  async removeTrack(id: string) {
    return this.prismaService.favorite.update({
      where: { id: 'common' },
      data: {
        tracks: {
          disconnect: { id },
        },
      },
    });
  }

  async removeArtist(id: string) {
    return this.prismaService.favorite.update({
      where: { id: 'common' },
      data: {
        artists: {
          disconnect: { id },
        },
      },
    });
  }

  async removeAlbum(id: string) {
    return this.prismaService.favorite.update({
      where: { id: 'common' },
      data: {
        albums: {
          disconnect: { id },
        },
      },
    });
  }
}
