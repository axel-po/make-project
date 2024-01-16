import TableDashboard from "@/features/dashboard/TableDashboard";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import { usersInterestedInProjects } from "@/query/user.query";
import { getProjectsByUserId } from "@/query/project.query";
import ProjectCard from "@/features/project/ProjectCard";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  if (!session) {
    redirect("/");
  }

  const userInterestedByYourProject = await usersInterestedInProjects(userId);

  const projectsUser = await getProjectsByUserId(userId);

  console.log("dd", projectsUser);

  return (
    <>
      <h1 className="text-3xl font-bold">Votre Dashboard</h1>

      <section className="py-6">
        <h2>Vos projets : </h2>

        <div className="grid grid-cols-3 gap-4">
          <ProjectCard projects={projectsUser} />
        </div>
      </section>

      {/* <ul>
        {userInterestedByYourProject?.map((user) => (
          <li key={user.user.id}>
            user : {user.user.name} project : {user?.project?.title}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default Dashboard;
