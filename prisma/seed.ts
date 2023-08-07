import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingFavorite = await prisma.favorite.findUnique({
    where: { id: 'common' },
  });

  if (!existingFavorite) {
    await prisma.favorite.create({
      data: {
        id: 'common',
      },
    });
    console.log('Create default mark in Favorite');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
