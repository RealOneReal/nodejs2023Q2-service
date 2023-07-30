import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackRepository {
  private tracks: Track[] = [];

  async create(track: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      ...track,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async findAll() {
    return this.tracks;
  }

  async remove(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index > -1) {
      this.tracks.splice(index, 1);
      return true;
    }
    return false;
  }

  async findOne(id: string) {
    return this.tracks.find((Track) => Track.id === id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const Track = this.tracks.find((track) => track.id === id);
    const index = this.tracks.findIndex((track) => track.id === id);
    if (Track) {
      const updatedTrack = {
        ...Track,
        ...updateTrackDto,
      };
      this.tracks.splice(index, 1);
      this.tracks.push(updatedTrack);
      return updatedTrack;
    }
  }
}
