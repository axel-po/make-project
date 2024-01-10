import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Demo = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <div>Dashboardd</div>;
};

export default Demo;
