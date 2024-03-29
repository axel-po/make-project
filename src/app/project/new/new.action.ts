"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import { type FormProjectType } from "./FormNewProject";
import { redirect } from "next/navigation";

export const createProject = async (values: FormProjectType) => {
  const session = await getServerAuthSession();

  if (!session?.user.id) {
    throw new Error("You must be logged in to do this.");
  }

  await db.project.create({
    data: {
      title: values.title,
      description: values.description,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      category: {
        connect: {
          id: values.category,
        },
      },
      technologies: {
        connect: values.technologies.map((technologieID) => ({
          id: technologieID,
        })),
      },
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  redirect(`/`);
};
