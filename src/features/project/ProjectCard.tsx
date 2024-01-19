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
import { formatProjectDate } from "@/lib/utils";
import { Pencil, X } from "lucide-react";

type ProjectsProps = {
  projects: ProjectType[];
};

const ProjectCard = ({ projects }: ProjectsProps) => {
  return (
    <>
      {projects.map((project: ProjectType) => (
        <Card className="relative" key={project?.id}>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>Développement frontend</CardDescription>
            <CardDescription>
              Date de création :{" "}
              {formatProjectDate(project.createdAt.toString())}
            </CardDescription>
          </CardHeader>
          <CardContent>{project.description}</CardContent>
          <CardFooter>
            <div className="flex w-full flex-wrap items-center justify-between gap-y-3">
              <p className="text-sm text-gray-400">Par {project.user.name}</p>
              <Link href={`/project/${project.id}`}>
                <Button className="w-full">En savoir plus</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProjectCard;
