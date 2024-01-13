import { Button } from "@/components/ui/button";
import { getProjectView } from "@/query/project.query";
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

  if (!project) {
    return notFound();
  }

  return (
    <>
      <div>{project?.title}</div>

      <div>{params?.projectId}</div>

      <Button>Demander à rejoindre </Button>
    </>
  );
};

export default ProjectView;
