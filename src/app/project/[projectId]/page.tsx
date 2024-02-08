import { getProjectView } from "@/query/project.query";

import { notFound } from "next/navigation";
import React from "react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import ProjectStatus from "@/features/project/ProjectStatus";
import ProjectsByCurrentUser from "@/features/dashboard/get-projects-current-user";

const ProjectView = async ({
  params,
}: {
  params: {
    projectId: string;
  };
}) => {
  const project = await getProjectView(params?.projectId);

  const projectId = params?.projectId;

  if (!project) {
    return notFound();
  }

  return (
    <>
      <Link className="flex items-center gap-2" href="/">
        <MoveLeft />
        <span>Retour</span>
      </Link>

      <h1 className="mt-5 text-4xl">{project?.title}</h1>

      <p className="text-neutral-500">Créer par : {project?.user?.name}</p>

      <p>Catégory : {project?.category?.name}</p>

      <div className="mt-12">
        {project?.technologies.map((techno) => (
          <p key={techno?.id}>{techno?.name}</p>
        ))}
      </div>

      <p className="my-8">{project?.description}</p>

      <ProjectStatus projectId={projectId} />

      <div className="mt-12">
        <h2>Personnes intéressées à rejoindre le projet : :</h2>
        <ProjectsByCurrentUser projectId={projectId} />
      </div>
    </>
  );
};

export default ProjectView;
