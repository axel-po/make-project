import { type ProjectType } from "@/query/project.query";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProjectsProps = {
  projects: ProjectType[];
};

const ProjectCard = ({ projects }: ProjectsProps) => {
  return (
    <>
      {projects.map((project: ProjectType) => (
        <Card key={project?.id}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>Développement frontend</CardDescription>
            <CardDescription>{project?.id}</CardDescription>
          </CardHeader>
          <CardContent>{project.description}</CardContent>
          <CardFooter className="mb-4 flex flex-col gap-y-3 text-right text-sm text-gray-400">
            Créer par Neo
            <Link href={`/project/${project.id}`}>
              <Button className="w-full">En savoir plus</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProjectCard;
