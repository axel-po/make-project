"use client";
import React from "react";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
    >
      Login
    </Button>
  );
};

export default Login;
