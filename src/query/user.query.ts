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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
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

export const updatedStatusUserProject = (
  projectId: string,
  userId: string,
  status: "accepted" | "pending" | "rejected",
) =>
  db.usersWhoWantJoinProject.update({
    where: { projectId_userId: { projectId, userId } },
    data: { status },
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
