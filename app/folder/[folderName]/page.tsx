import NavigationBar from "../../components/NavigationBar";
import Topbar from "../../components/TopBar";
import AddButton from "../../components/AddButton";

export default async function App({
  params,
}: {
  params: { folderName: string };
}) {
  return (
    <main className="h-full w-full">
      <div className="h-full w-full flex">
        <NavigationBar currentLink={params.folderName}></NavigationBar>
        <div className="flex flex-col h-full w-full">
          <Topbar type={"list"} listid={params.folderName}></Topbar>
          <AddButton type={"category"}></AddButton>
        </div>
      </div>
    </main>
  );
}
