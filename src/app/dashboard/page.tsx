import TableDashboard from "@/features/dashboard/TableDashboard";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  updatedStatusUserProject,
  usersInterestedInProjects,
} from "@/query/user.query";
import { getProjectsByUserId } from "@/query/project.query";
import ProjectCard from "@/features/project/ProjectCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { revalidatePath } from "next/cache";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  if (!session) {
    redirect("/");
  }

  const userInterestedByYourProject = await usersInterestedInProjects(userId);

  console.log("ok", userInterestedByYourProject);

  const projectsUser = await getProjectsByUserId(userId);

  return (
    <>
      <h1 className="text-3xl font-bold">Votre Dashboard</h1>

      <section className="py-6">
        <div className="block w-full">
          <h1 className="text-xl">
            Personnes intéréssé à rejoindre votre projet :{" "}
          </h1>

          {userInterestedByYourProject.map((user) => (
            <>
              {user?.status !== "rejected" && (
                <>
                  <Alert className="w-full">
                    <AlertTitle className="mb-4">
                      Statut : {user?.status}
                    </AlertTitle>
                    <AlertDescription className="">
                      <strong>{user?.user?.name}</strong> à demander à rejoindre
                      votre projet <strong> {user?.project?.title}</strong>
                    </AlertDescription>
                  </Alert>
                  <div className="mt-2 flex gap-3 text-sm">
                    {/* <button>Voir le profil</button> */}
                    <form>
                      <button
                        formAction={async () => {
                          "use server";

                          await updatedStatusUserProject(
                            user?.projectId,
                            user?.userId,
                            "accepted",
                          );

                          revalidatePath(`/dashboard`);
                        }}
                      >
                        Accepter
                      </button>
                    </form>

                    <form>
                      <button
                        formAction={async () => {
                          "use server";
                          await updatedStatusUserProject(
                            user?.projectId,
                            user?.userId,
                            "rejected",
                          );

                          revalidatePath(`/dashboard`);
                        }}
                      >
                        Refuser
                      </button>
                    </form>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
      </section>

      <section className="py-6">
        {/* <div className="block w-full">
          <h1 className="text-xl">Vous avez demander à rejoindre : </h1>

          <Alert className="w-full">
            <AlertDescription className="">
              Projet Full STack Next JS, par Axel Po
            </AlertDescription>
          </Alert>
          <div className="mt-2 flex gap-3 text-sm">
            <button>Voir le projet</button>
            <button>Annuler la demande</button>
          </div>
        </div> */}
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
