import { usersInterestedInProjects } from "@/query/project.query";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  if (!session) {
    redirect("/");
  }

  const userInterestedByYourProject = await usersInterestedInProjects(userId);

  console.log(userInterestedByYourProject);

  return (
    <>
      <h1 className="text-3xl font-bold">
        Dashboard de : {session?.user?.name}
      </h1>

      <ul>
        {userInterestedByYourProject?.map((user) => (
          <li key={user.user.id}>
            user : {user.user.name} project : {user?.project?.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
