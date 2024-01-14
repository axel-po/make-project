import { type Prisma } from "@prisma/client";
import { db } from "@/server/db";

export const getProjects = () =>
  db.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: {
        select: {
          id: true,
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
    },
  });

export const createRelationUserProject = (projectId: string, userId: string) =>
  db.usersWhoWantJoinProject.create({
    data: {
      projectId,
      userId,
      status: "pending",
    },
  });

export const usersInterestedInProjects = (userId: string) =>
  db.usersWhoWantJoinProject.findMany({
    where: {
      project: {
        user: {
          id: userId,
        },
      },
    },
    include: {
      user: true,
      project: {
        select: {
          title: true,
        },
      },
    },
  });

export type ProjectType = Prisma.PromiseReturnType<typeof getProjects>[number];
