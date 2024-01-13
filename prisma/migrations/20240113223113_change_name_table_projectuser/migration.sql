/*
  Warnings:

  - You are about to drop the `ProjectUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UsersWhoWantJoinProject" (
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT DEFAULT 'pending',
    "userName" TEXT,
    "projectName" TEXT,

    PRIMARY KEY ("projectId", "userId"),
    CONSTRAINT "UsersWhoWantJoinProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersWhoWantJoinProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
