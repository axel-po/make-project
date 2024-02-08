import { Alert, AlertTitle } from "@/components/ui/alert";
import { checkIfUserIsAlreadyInProject } from "@/query/user.query";
import { Check } from "lucide-react";
import React from "react";
import ButtonJoinProject from "./ButtonJoinProject";
import { RemoveProject } from "./ButtonRemoveProject";
import { getServerAuthSession } from "@/server/auth";
import { getProjectView } from "@/query/project.query";
import { notFound } from "next/navigation";

type ProjectStatusProps = {
  projectId: string;
};

const ProjectStatus = async ({ projectId }: ProjectStatusProps) => {
  const session = await getServerAuthSession();

  const project = await getProjectView(projectId);

  const userId = session?.user?.id ?? "";
  const isInProject = await checkIfUserIsAlreadyInProject(projectId, userId);

  let isProjectOwner = false;

  if (!project) {
    return notFound();
  } else {
    isProjectOwner = project.user.id === userId;
  }

  return (
    <>
      {session && (
        <>
          {isProjectOwner ? (
            <>
              <RemoveProject projectId={projectId} />
            </>
          ) : (
            <>
              {!isInProject ? (
                <>
                  <ButtonJoinProject projectId={projectId} userId={userId} />
                </>
              ) : (
                <>
                  {isInProject?.status === "rejected" ? (
                    <Alert className="max-w-fit border border-red-400 bg-red-100">
                      {/* <Check className="h-4 w-4" /> */}
                      <AlertTitle>Vous avez été refuser du projet</AlertTitle>
                    </Alert>
                  ) : isInProject?.status === "pending" ? (
                    <Alert className="max-w-fit border border-amber-400 bg-amber-100">
                      <Check className="h-4 w-4" />
                      <AlertTitle>
                        Vous avez demander à rejoindre ce projet
                      </AlertTitle>
                    </Alert>
                  ) : (
                    <>
                      <Alert className="max-w-fit border border-green-400 bg-green-100">
                        <Check className="h-4 w-4" />
                        <AlertTitle>
                          Vous avez déjà rejoint ce projet. !
                        </AlertTitle>
                      </Alert>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectStatus;
