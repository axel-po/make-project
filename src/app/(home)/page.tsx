import Login from "@/components/Login";
import User from "@/components/User";
import { db } from "@/server/db";
import React from "react";

const HomePage = async () => {
  const data = await db.project.findMany({
    select: {
      title: true,
    },
  });

  console.log("data", data);

  return (
    <>
      <Login />
      <User />
    </>
  );
};

export default HomePage;
