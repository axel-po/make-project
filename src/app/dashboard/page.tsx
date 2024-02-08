import TabsDashboard from "@/features/dashboard/TabsDashboard";
import { getProjectsRequestedByUser } from "@/query/user.query";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  const userId = session?.user?.id ?? "";

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <h1 className="mb-12 text-3xl font-bold">Votre Dashboard</h1>

      <main>
        <TabsDashboard />
      </main>
    </>
  );
};

export default Dashboard;
