import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    };

    const dbUser = await prisma.user.create({ data: user });

    users.push(dbUser);
  }
};
