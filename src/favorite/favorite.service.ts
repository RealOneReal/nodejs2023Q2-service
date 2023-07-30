import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private favoriteRepository: FavoriteRepository,
  ) {}

  findAll() {
    return this.favoriteRepository.findALL();
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id);
    track && this.favoriteRepository.addTrack(track);
    return track;
  }

  async addArtist(id: string) {
    const artist = await this.artistService.findOne(id);
    artist && this.favoriteRepository.addArtist(artist);
    return artist;
  }

  async addAlbum(id: string) {
    const album = await this.albumService.findOne(id);
    album && this.favoriteRepository.addAlbum(album);
    return album;
  }

  async removeTrack(id: string) {
    return this.favoriteRepository.removeTrack(id);
  }

  async removeArtist(id: string) {
    return this.favoriteRepository.removeArtist(id);
  }

  async removeAlbum(id: string) {
    return this.favoriteRepository.removeAlbum(id);
  }
}
