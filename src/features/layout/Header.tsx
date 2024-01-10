import Login from "@/components/Login";
import Logout from "@/components/Logout";
import React from "react";

const Header = () => {
  return (
    <nav className="h-[72px] border-b border-neutral-200 px-4">
      <div className="flex h-full items-center justify-between">
        <h1 className="text-2xl font-bold">Make Project</h1>
        <div>
          <Login />

          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Header;
