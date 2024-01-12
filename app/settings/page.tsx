import NavigationBar from "../components/NavigationBar";
import Topbar from "../components/TopBar";
import SettingsForm from "../components/SettingsForm";

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
          <Topbar type={"settings"}></Topbar>
          <SettingsForm></SettingsForm>
        </div>
      </div>
    </main>
  );
}
