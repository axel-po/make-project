import { Button } from "@/components/ui/button";
import React from "react";
import Alert from "../alert/Alert";
import { deleteProject } from "@/query/project.query";

const RemoveProject = () => {
  return (
    <>
      <Alert
        titleDialog="Supprimer le projet"
        title="Supprimer le projet"
        description="Etes vous sur de vouloir supprimer le projet ?"
      >
        <p>delete</p>
        {/* <form
          formAction={async () => {
            "use server";
            await deleteProject(projectId);
          }}
        >
          <Button variant="destructive">Delete</Button>
        </form> */}
      </Alert>
    </>
  );
};

export default RemoveProject;
