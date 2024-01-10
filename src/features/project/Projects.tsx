import { type ProjectType } from "@/query/project.query";
import React from "react";

type ProjectsProps = {
  projects: ProjectType[];
};

const Project = ({ projects }: ProjectsProps) => {
  return (
    <>
      {projects.map((project: ProjectType) => (
        <div key={project?.id}>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      ))}
    </>
  );
};

export default Project;
