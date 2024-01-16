import { getServerAuthSession } from "@/server/auth";
import FormNewProject from "./FormNewProject";
import { redirect } from "next/navigation";
import { getCategories } from "@/query/category.query";

const CreateProject = async () => {
  const session = await getServerAuthSession();

  const allCategories = await getCategories();

  console.log(allCategories);

  if (!session) {
    redirect("/");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-6">Création de votre projet</h1>

      <FormNewProject categories={allCategories} />
    </section>
  );
};

export default CreateProject;
