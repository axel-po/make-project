import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        Dashboard de : {session?.user?.name}
      </h1>
    </>
  );
};

export default Dashboard;
