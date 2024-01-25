import ProjectCard from "@/features/project/ProjectCard";
import { getProjectsByUserId } from "@/query/project.query";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProfilePage = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  const projectsUser = await getProjectsByUserId(userId);

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="flex gap-12">
        <aside className="w-[300px] ">
          <img
            className="h-32 w-32 rounded-full"
            src="https://images.unsplash.com/photo-1705622445363-7636870b9e7e?q=80&w=2237&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          <div className="py-6">
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Obcaecati adipisci debitis quisquam earum nostrum totam provident
              aliquid aperiam ducimus praesentium facilis esse excepturi, alias,
              porro nesciunt tempora voluptates, corporis ipsa.
            </p>
          </div>
        </aside>

        <div>
          <h1 className="text-3xl font-bold">John Doe</h1>

          <div className="flex gap-3 text-sm text-gray-400">
            <p>Straqbourg</p>
            <p>axel-pointud.fr</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
