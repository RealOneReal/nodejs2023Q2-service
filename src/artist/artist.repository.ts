import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  private artists: Artist[] = [];

  async create(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async findAll() {
    return this.artists;
  }

  async remove(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index > -1) {
      this.artists.splice(index, 1);
      return true;
    }
    return false;
  }

  async findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  async update(id: string, updateUserDto: UpdateArtistDto) {
    const artist = this.artists.find((user) => user.id === id);
    const index = this.artists.findIndex((user) => user.id === id);
    if (artist) {
      const updatedArtist = {
        ...artist,
        ...updateUserDto,
      };
      this.artists.splice(index, 1);
      this.artists.push(updatedArtist);
      return updatedArtist;
    }
  }
}
