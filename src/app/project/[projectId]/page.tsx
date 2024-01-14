import { Button } from "@/components/ui/button";
import {
  createRelationUserProject,
  getProjectView,
} from "@/query/project.query";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
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

  const userId = session?.user?.id ?? "1";
  const projectId = params?.projectId;

  let isProjectOwner = false;

  if (!project) {
    return notFound();
  } else {
    isProjectOwner = project.user.id === userId;
  }

  return (
    <>
      <div>{project?.title}</div>

      <div>{params?.projectId}</div>

      <p>Créer par : {project?.user?.name}</p>

      {!isProjectOwner && session && (
        <form>
          <Button
            formAction={async () => {
              "use server";
              await createRelationUserProject(projectId, userId);
            }}
          >
            Demander à rejoindre{" "}
          </Button>
        </form>
      )}
    </>
  );
};

export default ProjectView;
