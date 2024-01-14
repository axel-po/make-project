import { db } from "@/server/db";

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
