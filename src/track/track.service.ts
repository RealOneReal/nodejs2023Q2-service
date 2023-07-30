import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}
  create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.create(createTrackDto);
  }

  findAll() {
    return this.trackRepository.findAll();
  }

  findOne(id: string) {
    return this.trackRepository.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackRepository.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.trackRepository.remove(id);
  }
}
