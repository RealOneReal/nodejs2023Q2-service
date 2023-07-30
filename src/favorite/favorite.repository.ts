import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';

@Injectable()
export class FavoriteRepository {
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];

  async addTrack(track: Track) {
    this.tracks.push(track);
  }

  async removeTrack(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index > -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }

  async addAlbum(album: Album) {
    this.albums.push(album);
  }

  async removeAlbum(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index > -1) {
      this.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  async addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  async removeArtist(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index > -1) {
      this.artists.splice(index, 1);
      return true;
    }
    return false;
  }

  async findALL() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }
}
