import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { usersInterestedInProjects } from "@/query/user.query";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import UpdateStatusProject from "./update-status-project";

const ProjectsByCurrentUser = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  const userInterestedByYourProject = await usersInterestedInProjects(userId);
  console.log(userInterestedByYourProject);

  return (
    <>
      {userInterestedByYourProject.map((user) => (
        <>
          <>
            <Alert
              className={`w-full ${
                user?.status === "pending"
                  ? "border-yellow-200 bg-yellow-100/50"
                  : user?.status === "accepted"
                    ? "border-green-200 bg-green-100/50"
                    : user?.status === "rejected"
                      ? "border-red-400 bg-red-100/50"
                      : ""
              }`}
            >
              <AlertTitle className="mb-4">
                Statut :{" "}
                {user?.status === "pending"
                  ? "En cours"
                  : user?.status === "accepted"
                    ? "Accepté"
                    : user?.status === "rejected"
                      ? "Refusé"
                      : ""}
              </AlertTitle>
              <AlertDescription className="">
                <strong>{user?.user?.name}</strong> à demander à rejoindre votre
                projet <strong> {user?.project?.title}</strong>
              </AlertDescription>
            </Alert>
            <div className="mt-2 flex gap-3 text-sm">
              <Link href="/profile">
                <button className="rounded-md bg-neutral-200 px-4 py-2 transition hover:bg-neutral-200">
                  Voir le profil
                </button>
              </Link>

              <UpdateStatusProject
                projectId={user?.projectId}
                userId={user?.userId}
                status="accepted"
              />
              <UpdateStatusProject
                projectId={user?.projectId}
                userId={user?.userId}
                status="rejected"
              />
            </div>
          </>
        </>
      ))}
    </>
  );
};

export default ProjectsByCurrentUser;
