"use client";

import { useActivePath } from "@/hooks/useActivePath";
import Link from "next/link";

type PropsLinkSideBar = {
  children: React.ReactNode;
  href: string;
  checkActivePath?: boolean;
};

const Sidebar = () => {
  return (
    <div className="fixed top-[72px] flex h-full w-64 flex-col border-r  bg-white dark:bg-gray-800">
      <div className="flex h-16 items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <span className="">Bievenue Axel !</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <LinkSideBar checkActivePath href="/">
            Accueil
          </LinkSideBar>
          <LinkSideBar checkActivePath href="/profile">
            Profile
          </LinkSideBar>
        </nav>
      </div>
    </div>
  );
};

export const LinkSideBar = ({ children, href }: PropsLinkSideBar) => {
  const checkActivePath = useActivePath();

  return (
    <Link
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
        checkActivePath(href) ? "bg-gray-100 text-gray-900" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};
export default Sidebar;
