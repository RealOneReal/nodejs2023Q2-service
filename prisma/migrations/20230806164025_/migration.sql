/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoriteId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoriteId";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoriteId";

-- CreateTable
CREATE TABLE "ArtistFavorite" (
    "favoriteId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistFavorite_pkey" PRIMARY KEY ("favoriteId","artistId")
);

-- CreateTable
CREATE TABLE "AlbumFavorite" (
    "favoriteId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "AlbumFavorite_pkey" PRIMARY KEY ("favoriteId","albumId")
);

-- CreateTable
CREATE TABLE "TrackFavorite" (
    "favoriteId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TrackFavorite_pkey" PRIMARY KEY ("favoriteId","trackId")
);

-- AddForeignKey
ALTER TABLE "ArtistFavorite" ADD CONSTRAINT "ArtistFavorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistFavorite" ADD CONSTRAINT "ArtistFavorite_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFavorite" ADD CONSTRAINT "AlbumFavorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFavorite" ADD CONSTRAINT "AlbumFavorite_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFavorite" ADD CONSTRAINT "TrackFavorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackFavorite" ADD CONSTRAINT "TrackFavorite_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
