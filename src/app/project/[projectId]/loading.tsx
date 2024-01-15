import { Loader } from "@/components/ui/loader";
import React from "react";

const loading = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Loader size={50} />
    </main>
  );
};

export default loading;
