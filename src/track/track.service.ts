import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prismaService: PrismaService) {}
  create(createTrackDto: CreateTrackDto) {
    return this.prismaService.track.create({ data: createTrackDto });
  }

  findAll() {
    return this.prismaService.track.findMany();
  }

  findOne(id: string) {
    return this.prismaService.track.findUnique({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const track = await this.prismaService.track.update({
        where: { id },
        data: updateTrackDto,
      });
      return track;
    } catch (error) {
      return;
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.track.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
