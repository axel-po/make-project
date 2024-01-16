import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { User2 } from "lucide-react";
import Logout from "./Logout";

const UserProfile = async () => {
  const session = await getServerAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          {session?.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link className="mb-2 h-[40px] cursor-pointer" href="/profile">
            <User2 className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
