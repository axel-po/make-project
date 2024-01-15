import { getServerAuthSession } from "@/server/auth";
import FormNewProject from "./FormNewProject";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-6">Création de votre projet</h1>

      <FormNewProject />
    </section>
  );
};

export default CreateProject;
