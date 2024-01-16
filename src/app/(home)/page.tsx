import { Button } from "@/components/ui/button";
import ProjectCard from "@/features/project/ProjectCard";
import { getProjects } from "@/query/project.query";
import Link from "next/link";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

const HomePage = async () => {
  const projects = await getProjects();

  return (
    <section className="mt-6">
      {projects.length === 0 ? (
        <>
          <Alert className="flex items-center">
            <ShieldAlert />
            <AlertDescription className="h-full">
              Il y a aucun projet pour le moment.
            </AlertDescription>
          </Alert>
          <Link className="mt-6 block" href="/project/new">
            <Button>Créer un projet</Button>
          </Link>
        </>
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
