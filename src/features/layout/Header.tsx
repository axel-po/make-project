import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import React from "react";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="h-[72px] border-b border-neutral-200 px-4">
      <div className="flex h-full items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Make Project</h1>
        </Link>

        <div className="flex items-center gap-3">
          {session ? <p className="font-bold">{session?.user?.name}</p> : ""}
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Logout />
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
