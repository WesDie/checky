import { useGetListsInFolderData } from "@/lib/hooks/useSupabase";
import AddButton from "./AddButton";
import {
  ChevronRightIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default async function FolderSideBar({
  folderName,
}: {
  folderName: string;
}) {
  const folder = folderName;
  const listsData = await useGetListsInFolderData(folder);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="bg-secondary-bg h-full w-[475px] py-6 px-4 flex-col flex gap-4">
      <div className="flex gap-2">
        <div className="h-16 w-full bg-quaternary-bg rounded mb-4"></div>
        <div className="w-16 h-16 rounded hover:bg-quaternary-bg flex p-2 hover:opacity-50 hover:cursor-pointer transition">
          <ArrowLeftEndOnRectangleIcon className="opacity-20 m-auto"></ArrowLeftEndOnRectangleIcon>
        </div>
      </div>
      {listsData &&
      listsData.listsInFolder &&
      listsData.listsInFolder.length === 0 ? (
        <p className="opacity-50 mx-auto">No lists in folder</p>
      ) : (
        listsData.listsInFolder &&
        listsData.listsInFolder.map((list, index) => {
          const date = new Date(list.last_edited);
          const localDate = utcToZonedTime(date, timezone);
          const formattedDate = format(localDate, "dd-MM-yyyy");

          return (
            <Link
              href={`/folder/${folder}/${list.id}`}
              key={list.id}
              className="w-full bg-primary-bg flex p-4 gap-4 rounded hover:cursor-pointer hover:opacity-80 transition"
            >
              <div className="flex w-[50px] h-[50px] my-auto bg-quaternary-bg rounded-full">
                <p className="m-auto text-xl">{list.icon}</p>
              </div>
              <div className="my-auto">
                <h1>{list.title}</h1>
                <p className="opacity-50 text-sm">
                  {listsData.itemsAmount[index]}{" "}
                  {listsData.itemsAmount[index] === 1 ? "Item" : "Items"} |{" "}
                  {formattedDate}
                </p>
              </div>
              <ChevronRightIcon className="w-8 h-8 my-auto ml-auto opacity-50"></ChevronRightIcon>
            </Link>
          );
        })
      )}
      <AddButton type={"folder"} marginsBottom={false}></AddButton>
    </div>
  );
}
