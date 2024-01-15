import { useGetListsInFolderData } from "@/lib/hooks/useSupabase";
import AddButton from "./AddButton";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function FolderSideBar({
  folderName,
}: {
  folderName: string;
}) {
  const folder = folderName;
  const lists = await useGetListsInFolderData(folder);

  return (
    <div className="bg-secondary-bg h-full w-[475px] py-8 px-4 flex-col flex gap-4">
      {lists && lists.length === 0 ? (
        <p className="opacity-50 mx-auto">No lists in folder</p>
      ) : (
        lists &&
        lists.map((list) => (
          <Link
            href={`/folder/${folder}/list/${list.title}`}
            key={list.id}
            className="w-full bg-primary-bg flex p-4 gap-4 rounded hover:cursor-pointer hover:opacity-80 transition"
          >
            <div className="flex w-[50px] h-[50px] my-auto bg-quaternary-bg rounded-full">
              <p className="m-auto text-xl">{list.icon}</p>
            </div>
            <div className="my-auto">
              <h1>{list.title}</h1>
              <p className="opacity-50 text-sm">{list.description}</p>
            </div>
            <ChevronRightIcon className="w-8 h-8 my-auto ml-auto opacity-50"></ChevronRightIcon>
          </Link>
        ))
      )}
      <AddButton type={"folder"} marginsBottom={false}></AddButton>
    </div>
  );
}
