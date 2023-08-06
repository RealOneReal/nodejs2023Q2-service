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

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.prismaService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  remove(id: string) {
    return this.prismaService.track.delete({ where: { id } });
  }
}
