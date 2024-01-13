import NavigationBar from "../../components/NavigationBar";
import Topbar from "../../components/TopBar";
import AppSettings from "../../components/AppSettings";

export default async function App({
  params,
}: {
  params: { folderName: string };
}) {
  return (
    <>
      <AppSettings></AppSettings>
    </>
  );
}
