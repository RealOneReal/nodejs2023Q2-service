import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prismaService: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.prismaService.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.prismaService.album.findMany();
  }

  findOne(id: string) {
    return this.prismaService.album.findUnique({ where: { id } });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.prismaService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.album.delete({ where: { id } });
  }
}
