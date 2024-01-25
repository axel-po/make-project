import { db } from "@/server/db";

// Requests page dashboard

// Personnes intéréssé à rejoindre votre projet
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

// Les projets que l'utilisateur à rejoint
export const getProjectsRequestedByUser = (userId: string) =>
  db.usersWhoWantJoinProject.findMany({
    where: {
      userId,
    },
    include: {
      project: {
        select: {
          id: true,
          title: true,
          description: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
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

export const cancelRequestToJoinProject = (projectId: string, userId: string) =>
  db.usersWhoWantJoinProject.delete({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
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

export const createRelationUserProject = (projectId: string, userId: string) =>
  db.usersWhoWantJoinProject.create({
    data: {
      projectId,
      userId,
      status: "pending",
    },
  });
