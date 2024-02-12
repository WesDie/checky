import FolderSideBar from "../../../components/FolderSideBar";
import { useGetSingleFolderData } from "@/lib/hooks/useSupabase";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { folderName: string };
}) {
  const { folderData } = await useGetSingleFolderData(params.folderName);
  if (folderData && folderData.length > 0) {
    return (
      <div className="flex h-full w-full">
        <FolderSideBar folderName={params.folderName} />
        <div className="w-full h-full flex flex-col">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      <p className="m-auto text-secondary-text">This folder does not exist</p>
    </div>
  );
}
