"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

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
