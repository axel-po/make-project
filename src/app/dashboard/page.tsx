import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  cancelRequestToJoinProject,
  getProjectsRequestedByUser,
  updatedStatusUserProject,
  usersInterestedInProjects,
} from "@/query/user.query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  if (!session) {
    redirect("/");
  }

  const userInterestedByYourProject = await usersInterestedInProjects(userId);
  const userRequestProject = await getProjectsRequestedByUser(userId);
  console.log(userRequestProject);

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
              {/* {user?.status !== "rejected" && ( */}
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
              {/* )} */}
            </>
          ))}
        </div>
      </section>

      <section className="py-6">
        <div className="block w-full">
          <h1 className="text-xl">Vous avez demander à rejoindre : </h1>

          {userRequestProject.map((user) => (
            <div key={user?.project?.id}>
              <Alert className="mt-4 w-full">
                <AlertDescription className="">
                  {user?.project?.title} Créer par {user?.project?.user?.name}
                </AlertDescription>
              </Alert>
              <div className="mb-6 mt-2 flex gap-3 text-sm">
                <Link
                  className="font-vold"
                  href={`/project/${user?.project?.id}`}
                >
                  Voir le projet
                </Link>

                <form>
                  <button
                    formAction={async () => {
                      "use server";

                      await cancelRequestToJoinProject(
                        user?.projectId,
                        user?.userId,
                      );

                      revalidatePath(`/dashboard`);
                    }}
                    className="text-red-400"
                  >
                    Annuler la demande
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
