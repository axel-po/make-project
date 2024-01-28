import { updatedStatusUserProject } from "@/query/user.query";
import { revalidatePath } from "next/cache";

type Props = {
  projectId: string;
  userId: string;
  status: "accepted" | "rejected" | "pending";
};

const UpdateStatusProject = ({ projectId, userId, status }: Props) => {
  return (
    <form>
      <button
        className={`${
          status === "accepted"
            ? "bg-green-500  hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        } rounded-md px-4 py-2 text-white transition`}
        formAction={async () => {
          "use server";
          await updatedStatusUserProject(projectId, userId, status);

          revalidatePath(`/dashboard`);
        }}
      >
        {status === "accepted" ? "Accepter" : "Refuser"}
      </button>
    </form>
  );
};

export default UpdateStatusProject;
