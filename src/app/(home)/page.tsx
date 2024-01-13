import User from "@/components/User";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/features/project/ProjectCard";
import { getProjects } from "@/query/project.query";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
  const projects = await getProjects();

  return (
    <>
      <Link href="/project/new">
        <Button>Créer un projet</Button>
      </Link>

      <div className="mx-auto grid w-[90%] max-w-[1400px] grid-cols-4">
        <ProjectCard projects={projects} />
      </div>
    </>
  );
};

export default HomePage;
