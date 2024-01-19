import { type Prisma } from "@prisma/client";
import { db } from "@/server/db";

export const getProjects = () =>
  db.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      technologies: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

export const getProjectView = (id: string) =>
  db.project.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      user: true,
      category: true,
    },
  });

export const deleteProject = (projectId: string) =>
  db.project.delete({
    where: {
      id: projectId,
    },
  });

export const getProjectsByUserId = (userId: string) =>
  db.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      technologies: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
export type ProjectType = Prisma.PromiseReturnType<typeof getProjects>[number];
