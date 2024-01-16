import { Button } from "@/components/ui/button";
import ProjectCard from "@/features/project/ProjectCard";
import { getProjects } from "@/query/project.query";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  const projects = await getProjects();

  return (
    <section className="mt-6">
      {projects.length === 0 ? (
        <p>Pas de projet disponible.</p>
      ) : (
        <>
          <h1 className="mb-6 text-3xl font-bold">Les derniers projets</h1>
          <div className="grid grid-cols-3 gap-4">
            <ProjectCard projects={projects} />
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;
