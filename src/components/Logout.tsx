"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Logout
    </Button>
  );
};

export default Logout;
