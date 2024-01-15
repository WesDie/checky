import AddButton from "../../../components/AddButton";
import FolderSideBar from "../../../components/FolderSideBar";

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { folderName: string };
}) {
  return (
    <>
      <div className="flex h-full w-full">
        <FolderSideBar folderName={params.folderName} />
        <div className="w-full h-full flex flex-col">{children}</div>
      </div>
    </>
  );
}
