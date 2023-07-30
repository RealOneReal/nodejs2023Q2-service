import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }

  findAll() {
    return this.artistRepository.findAll();
  }

  findOne(id: string) {
    return this.artistRepository.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: string) {
    const result = await this.artistRepository.remove(id);
    if (result) {
      const tracks = await this.trackService.findAll();
      tracks.forEach((track) => {
        if (track.artistId === id) {
          this.trackService.update(track.id, { artistId: null });
        }
      });
      const albums = await this.albumService.findAll();
      albums.forEach((album) => {
        if (album.artistId === id) {
          this.albumService.update(album.id, { artistId: null });
        }
      });
    }
    return result;
  }
}
