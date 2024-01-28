import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/features/project/ProjectCard";
import { getProjects } from "@/query/project.query";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

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
          <div className="flex flex-col gap-y-5">
            <ProjectCard projects={projects} />
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;
