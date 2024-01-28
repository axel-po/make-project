import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsByCurrentUser from "./get-projects-current-user";

const TabsDashboard = () => {
  return (
    <Tabs defaultValue="yourProject" className="full">
      <TabsList>
        <TabsTrigger value="yourProject">Vos Projets</TabsTrigger>
        <TabsTrigger value="othersProject">
          Vos Demandes de participatopns
        </TabsTrigger>
      </TabsList>
      <TabsContent value="yourProject">
        <ProjectsByCurrentUser />
      </TabsContent>
      <TabsContent value="othersProject">en cours ...</TabsContent>
    </Tabs>
  );
};

export default TabsDashboard;
