import { getServerAuthSession } from "@/server/auth";
import FormNewProject from "./FormNewProject";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <h1>Création projet</h1>

      <FormNewProject />
    </>
  );
};

export default CreateProject;
