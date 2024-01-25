import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/query/project.query";
import { db } from "@/server/db";

type Props = {
  projectId: string;
};
export function RemoveProject(projectId: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Supprimer ?</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes vous sur ?</AlertDialogTitle>
          <AlertDialogDescription>
            cette action est iréverssible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <form>
              <button
                formAction={async () => {
                  "use server";
                  await deleteProject(projectId?.projectId);
                }}
              >
                Continue
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
