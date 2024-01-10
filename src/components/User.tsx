import { getServerAuthSession } from "@/server/auth";
import React from "react";

const User = async () => {
  const session = await getServerAuthSession();

  console.log("session", session);

  return <div>{session?.user?.name}</div>;
};

export default User;
