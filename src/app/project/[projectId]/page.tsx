import ButtonJoinProject from "@/features/project/ButtonJoinProject";
import { getProjectView } from "@/query/project.query";
import { checkIfUserIsAlreadyInProject } from "@/query/user.query";
import { getServerAuthSession } from "@/server/auth";

import { notFound } from "next/navigation";
import React from "react";

const ProjectView = async ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
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

  console.log("isInProject", isInProject);

  return (
    <>
      <div>{project?.title}</div>

      <div>{params?.projectId}</div>

      <p>Créer par : {project?.user?.name}</p>
      <p>user session id : {userId}</p>

      {/* {!isProjectOwner && session && !isInProject && (
        <ButtonJoinProject projectId={projectId} userId={userId} />
      )} */}

      {session && (
        <>
          {isProjectOwner ? (
            <>
              <div className="text-green-400">
                Vous êtes le créateur du projet
              </div>
            </>
          ) : (
            <>
              <div className="text-red-400">
                Vous n êtes pas le créateur du projet
              </div>
              {!isInProject ? (
                <>
                  <ButtonJoinProject projectId={projectId} userId={userId} />
                </>
              ) : (
                <p>vous avez deja rejoint ce projet</p>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProjectView;
