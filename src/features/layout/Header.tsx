import { Button } from "@/components/ui/button";
import Login from "@/features/auth/Login";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

import Image from "next/image";
import UserProfile from "../auth/UserProfile";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="fixed inset-0 h-[72px]   border-b bg-white px-12 ">
      <div className="mx-auto flex h-full max-w-[2500px] items-center justify-between">
        <Link className="flex items-center gap-3" href="/">
          <Image src="/logo.svg" alt="" width={50} height={50} />
          <h1 className="text-2xl font-bold">Make Project</h1>
        </Link>

        {session?.user?.id ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/project/new">
              <Button>Créer un projet</Button>
            </Link>
            <UserProfile />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};

export default Header;
