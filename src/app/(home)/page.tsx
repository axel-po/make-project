import Login from "@/components/Login";
import User from "@/components/User";
import Project from "@/features/project/Projects";
import { getProjects } from "@/query/project.query";
import React from "react";

const HomePage = async () => {
  const projects = await getProjects();

  return (
    <>
      <User />
      <Project projects={projects} />
    </>
  );
};

export default HomePage;
