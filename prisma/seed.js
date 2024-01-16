import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  let users = [];

  for (let i = 0; i < 10; i++) {
    const userData = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
    };

    users.push(userData);

    const dbUser = await prisma.user.create({ data: userData });

    users.push(dbUser);
  }

  // if (users.length === 0) {
  //   console.error(
  //     "No users found. Please create some users before creating projects.",
  //   );
  //   return;
  // }

  // for (let i = 0; i < 10; i++) {
  //   const randomUserIndex = Math.floor(Math.random() * users.length);
  //   const randomUserId = users[randomUserIndex].id;

  //   const projectData = {
  //     title: faker.lorem.words(),
  //     description: faker.lorem.paragraph(),
  //     userId: randomUserId,
  //   };

  //   await prisma.project.create({ data: projectData });
  // }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
};
