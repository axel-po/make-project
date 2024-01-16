import { Button } from "@/components/ui/button";
import { createRelationUserProject } from "@/query/user.query";
import { revalidatePath } from "next/cache";

import React from "react";

type Props = {
  projectId: string;
  userId: string;
};

const ButtonJoinProject = ({ projectId, userId }: Props) => {
  return (
    <form>
      <Button
        formAction={async () => {
          "use server";
          await createRelationUserProject(projectId, userId);

          revalidatePath(`/project/${projectId}`);
        }}
      >
        Demander à rejoindre
      </Button>
    </form>
  );
};

export default ButtonJoinProject;
