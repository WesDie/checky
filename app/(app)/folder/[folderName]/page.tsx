import AddButton from "../../../components/AddButton";
import FolderSideBar from "../../../components/FolderSideBar";

export default async function App({
  params,
}: {
  params: { folderName: string };
}) {
  return (
    <>
      <div className="flex h-full w-full">
        <FolderSideBar folderName={params.folderName} />
        <div className="w-full h-full flex flex-col">
          <AddButton type={"list"}></AddButton>
        </div>
      </div>
    </>
  );
}
