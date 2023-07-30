import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Track } from 'src/track/track.interface';

export class FavoriteDto {
  artists: Artist[];

  albums: Album[];

  tracks: Track[];
}
