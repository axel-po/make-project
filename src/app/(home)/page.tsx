import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/features/project/ProjectCard";
import { getProjects } from "@/query/project.query";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  // const projects = await getProjects();

  return (
    <p>ok</p>
    // <section className="mt-6">
    //   {projects.length === 0 ? (
    //     <>
    //       <Alert className="flex items-center">
    //         <ShieldAlert />
    //         <p className="!pl-8">
    //           Il y a aucun projet pour le moment. Sois le premier à en créer un
    //           😉🚀 !
    //         </p>
    //       </Alert>
    //       <Link className="mt-6 block max-w-fit bg-red-100" href="/project/new">
    //         <Button>Créer un projet</Button>
    //       </Link>
    //     </>
    //   ) : (
    //     <>
    //       <h1 className="mb-6 text-3xl font-bold">Les derniers projets</h1>
    //       <div className="flex flex-col gap-y-5">
    //         <ProjectCard projects={projects} />
    //       </div>
    //     </>
    //   )}
    // </section>
  );
};

export default HomePage;
