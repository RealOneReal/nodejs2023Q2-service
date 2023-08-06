import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prismaService: PrismaService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prismaService.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.prismaService.artist.findMany();
  }

  findOne(id: string) {
    return this.prismaService.artist.findUnique({ where: { id } });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prismaService.artist.delete({ where: { id } });
  }
}
