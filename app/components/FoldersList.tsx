"use client";
import AddButton from "./AddButton";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { debounce, set } from "lodash";
import ProfileIcon from "./ProfileIcon";

export default function FoldersList({
  data,
  folderName,
}: {
  data: any;
  folderName: string;
}) {
  const [listsData, setListsData] = useState<{
    listsInFolder: any[] | null;
    itemsAmount: any[];
    listsMembers: any[];
  }>({ listsInFolder: null, itemsAmount: [], listsMembers: [] });
  const [searchQuery, setSearchQuery] = useState("");

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    setListsData(
      data || { listsInFolder: null, itemsAmount: [], listsMembers: [] }
    );

    const handleSearch = debounce((query: string) => {
      setSearchQuery(query);
    }, 300);

    handleSearch(searchQuery);

    return () => {
      handleSearch.cancel();
    };
  }, [searchQuery]);

  const filteredListsData: any[] =
    listsData.listsInFolder?.filter((list: any) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="flex gap-2">
        <div className="flex h-14 w-full bg-quaternary-bg rounded mb-4 p-4 gap-4">
          <MagnifyingGlassIcon className="w-6 h-6 my-auto opacity-30"></MagnifyingGlassIcon>
          <input
            className="bg-transparent focus:outline-none placeholder-secondary-text"
            placeholder="Search in Folder"
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        {/* <div className="w-16 h-16 rounded hover:bg-quaternary-bg flex p-2 hover:opacity-50 hover:cursor-pointer transition">
          <ArrowLeftEndOnRectangleIcon className="opacity-20 m-auto"></ArrowLeftEndOnRectangleIcon>
        </div> */}
      </div>
      {listsData && filteredListsData && filteredListsData.length === 0 ? (
        <p className="opacity-50 mx-auto">No lists found</p>
      ) : (
        filteredListsData &&
        filteredListsData.map((list, index) => {
          const date = new Date(list.last_edited);
          const localDate = utcToZonedTime(date, timezone);
          const currentDate = new Date();
          const formattedDate =
            currentDate.toDateString() === localDate.toDateString()
              ? "Today at " + format(localDate, "HH:mm")
              : currentDate.getDate() - localDate.getDate() === 1
              ? "Yesterday"
              : format(localDate, "dd-MM-yyyy");

          return (
            <Link
              href={`/folder/${folderName}/${list.id}`}
              key={list.id} // Add a unique key prop
              className="w-full bg-primary-bg flex p-4 gap-4 rounded hover:cursor-pointer hover:opacity-80 transition"
            >
              <div className="flex w-[50px] h-[50px] my-auto bg-quaternary-bg rounded-full">
                <p className="m-auto text-xl">{list.icon}</p>
              </div>
              <div className="my-auto">
                <div className="flex gap-2">
                  <h1>{list.title}</h1>
                  <div className="flex">
                    {listsData.listsMembers.find(
                      (memberObj) => memberObj.listid === list.id
                    ) &&
                      Object.values(
                        listsData.listsMembers.find(
                          (memberObj) => memberObj.listid === list.id
                        )
                      ).map((member: any, memberIndex: any) => {
                        if (Array.isArray(member)) {
                          return member.map((memberDetail) => (
                            <div
                              key={memberIndex}
                              className={`w-4 h-4 my-auto ${
                                memberIndex !== 0 ? "-ml-2" : ""
                              }`}
                            >
                              <ProfileIcon
                                userData={memberDetail}
                              ></ProfileIcon>
                            </div>
                          ));
                        }
                        return null;
                      })}
                  </div>
                </div>
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
    </>
  );
}
