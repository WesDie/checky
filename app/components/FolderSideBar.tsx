import { useGetListsInFolderData } from "@/lib/hooks/useSupabase";
import FoldersList from "./FoldersList";

export default async function FolderSideBar({
  folderName,
}: {
  folderName: string;
}) {
  const data = await useGetListsInFolderData(folderName);

  return (
    <div className="bg-secondary-bg h-full min-w-[380px] py-6 px-4 flex-col flex gap-4">
      <FoldersList data={data} folderName={folderName}></FoldersList>
    </div>
  );
}
