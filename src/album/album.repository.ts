import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './album.interface';

@Injectable()
export class AlbumRepository {
  private albums: Album[] = [];

  async create(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      ...album,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return this.albums;
  }

  async remove(id: string) {
    const index = this.albums.findIndex((user) => user.id === id);
    if (index > -1) {
      this.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  async findOne(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albums.find((user) => user.id === id);
    const index = this.albums.findIndex((user) => user.id === id);
    if (album) {
      const updatedalbum = {
        ...album,
        ...updateAlbumDto,
      };
      this.albums.splice(index, 1);
      this.albums.push(updatedalbum);
      return updatedalbum;
    }
  }
}
