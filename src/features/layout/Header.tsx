import Login from "@/features/auth/Login";
import Logout from "@/features/auth/Logout";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "@/components/User";

import UserProfile from "../auth/UserProfile";
import Image from "next/image";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="h-[72px] border-b border-neutral-200 bg-white px-12">
      <div className="flex h-full items-center justify-between">
        <Link className="flex items-center gap-3" href="/">
          <Image src="/logo.svg" alt="" width={50} height={50} />
          <h1 className="text-2xl font-bold">Make Project</h1>
        </Link>

        {session?.user?.id ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button>Vos demandes</Button>
            </Link>
            <UserProfile />
            <Link href="/project/new">
              <Button>Créer un projet</Button>
            </Link>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};

export default Header;
