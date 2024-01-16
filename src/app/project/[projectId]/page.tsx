import { Button } from "@/components/ui/button";
import ButtonJoinProject from "@/features/project/ButtonJoinProject";
import RemoveProject from "@/features/project/RemoveProject";
import { getProjectView } from "@/query/project.query";
import { checkIfUserIsAlreadyInProject } from "@/query/user.query";
import { getServerAuthSession } from "@/server/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { notFound } from "next/navigation";
import React from "react";
import { Check, MoveLeft } from "lucide-react";
import Link from "next/link";

const ProjectView = async ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 300000)); // a supprimer pour la prod

  const project = await getProjectView(params?.projectId);
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";
  const projectId = params?.projectId;

  let isProjectOwner = false;

  if (!project) {
    return notFound();
  } else {
    isProjectOwner = project.user.id === userId;
  }

  // Check if user is already in project
  const isInProject = await checkIfUserIsAlreadyInProject(projectId, userId);

  return (
    <>
      <Link className="flex items-center gap-2" href="/">
        <MoveLeft />
        <span>Retour</span>
      </Link>

      <h1 className="mt-5 text-4xl">{project?.title}</h1>

      <p className="text-neutral-500">Créer par : {project?.user?.name}</p>

      <p className="my-8">{project?.description}</p>
      {session && (
        <>
          {isProjectOwner ? (
            <>
              {/* <RemoveProject /> */}
              <p>remove</p>
            </>
          ) : (
            <>
              {!isInProject ? (
                <>
                  <ButtonJoinProject projectId={projectId} userId={userId} />
                </>
              ) : (
                <Alert className="max-w-fit border border-green-400 bg-green-100">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Vous avez déjà rejoint ce projet. !</AlertTitle>
                </Alert>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectView;
