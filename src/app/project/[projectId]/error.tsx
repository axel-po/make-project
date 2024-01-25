"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col justify-end">
      <h2 className="mb-4 text-2xl text-red-400">Something went wrong!</h2>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="text-xl font-bold">
          {error.message}
        </AlertDescription>
      </Alert>

      <Button variant="destructive" className="mt-6" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
