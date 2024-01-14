/*
  Warnings:

  - You are about to drop the column `projectName` on the `UsersWhoWantJoinProject` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `UsersWhoWantJoinProject` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersWhoWantJoinProject" (
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT DEFAULT 'pending',

    PRIMARY KEY ("projectId", "userId"),
    CONSTRAINT "UsersWhoWantJoinProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersWhoWantJoinProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersWhoWantJoinProject" ("projectId", "status", "userId") SELECT "projectId", "status", "userId" FROM "UsersWhoWantJoinProject";
DROP TABLE "UsersWhoWantJoinProject";
ALTER TABLE "new_UsersWhoWantJoinProject" RENAME TO "UsersWhoWantJoinProject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
