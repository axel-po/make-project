import { type Prisma } from "@prisma/client";
import { db } from "@/server/db";

export const getProjects = () =>
  db.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

export type ProjectType = Prisma.PromiseReturnType<typeof getProjects>[number];
