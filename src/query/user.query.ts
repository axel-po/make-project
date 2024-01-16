import { db } from "@/server/db";

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

export const createRelationUserProject = (projectId: string, userId: string) =>
  db.usersWhoWantJoinProject.create({
    data: {
      projectId,
      userId,
      status: "pending",
    },
  });

export const checkIfUserIsAlreadyInProject = (
  projectId: string,
  userId: string,
) =>
  db.usersWhoWantJoinProject.findFirst({
    where: {
      projectId,
      userId,
    },
  });
