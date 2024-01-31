import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Créer des catégories
    const categories = ["Web", "Mobile", "IA", "Big Data"];
    const createdCategories = await prisma.category.createMany({
      data: categories.map((name) => ({ name })),
      skipDuplicates: true,
    });
    console.log("Catégories créées:", createdCategories);

    // Créer des technologies
    const technologies = ["React", "Angular", "Vue", "Node.js"];
    const createdTechnologies = await prisma.technology.createMany({
      data: technologies.map((name) => ({ name })),
      skipDuplicates: true,
    });
    console.log("Technologies créées:", createdTechnologies);
  } catch (error) {
    console.error("Une erreur s'est produite:", error);
  } finally {
    await prisma.$disconnect();
  }
}

void seed();
