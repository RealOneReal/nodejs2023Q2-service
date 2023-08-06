-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoriteId_fkey";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE SET NULL ON UPDATE CASCADE;
