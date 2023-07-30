import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.favoriteService.addTrack(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    return true;
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = await this.favoriteService.addAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException('Track not found');
    }
    return true;
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.favoriteService.addArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException('Track not found');
    }
    return true;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const result = await this.favoriteService.removeTrack(id);
    if (!result) {
      throw new NotFoundException('Track not found in favourites');
    }
    return result;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const result = await this.favoriteService.removeAlbum(id);
    if (!result) {
      throw new NotFoundException('Album not found in favourites');
    }
    return result;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const result = await this.favoriteService.removeArtist(id);
    if (!result) {
      throw new NotFoundException('Track not found in favourites');
    }
    return result;
  }

  @Get()
  async findALL() {
    return await this.favoriteService.findAll();
  }
}
