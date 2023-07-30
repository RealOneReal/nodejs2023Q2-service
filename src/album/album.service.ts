import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private trackService: TrackService,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  findAll() {
    return this.albumRepository.findAll();
  }

  findOne(id: string) {
    return this.albumRepository.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    const result = this.albumRepository.remove(id);
    if (result) {
      const tracks = await this.trackService.findAll();
      tracks.forEach((track) => {
        if (track.albumId === id) {
          this.trackService.update(track.id, { albumId: null });
        }
      });
    }
    return result;
  }
}
