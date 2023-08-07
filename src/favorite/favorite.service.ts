import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favorites = await this.prisma.favorite.findUnique({
      where: { id: 'common' },
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
    return {
      albums: favorites?.albums || [],
      tracks: favorites?.tracks || [],
      artists: favorites?.artists || [],
    };
  }

  async addTrack(id: string) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { tracks: { connect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });
      console.log(updatedFavorite);
      return updatedFavorite;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async addAlbum(id: string) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { albums: { connect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });

      return updatedFavorite;
    } catch (error) {
      return;
    }
  }

  async addArtist(id) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { artists: { connect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });

      return updatedFavorite;
    } catch (error) {
      return;
    }
  }

  async removeTrack(id: string) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { tracks: { disconnect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });

      return updatedFavorite;
    } catch (error) {
      return;
    }
  }

  async removeArtist(id: string) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { artists: { disconnect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });

      return updatedFavorite;
    } catch (error) {
      return;
    }
  }

  async removeAlbum(id: string) {
    try {
      const updatedFavorite = await this.prisma.favorite.update({
        where: { id: 'common' },
        data: { albums: { disconnect: { id } } },
        include: {
          tracks: true,
          artists: true,
          albums: true,
        },
      });

      return updatedFavorite;
    } catch (error) {
      return;
    }
  }
}
