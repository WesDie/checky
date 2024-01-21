"use client";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetListData } from "@/lib/hooks/useSupabase";
import { useState, useEffect } from "react";

export default function Topbar() {
  const pathname = usePathname();
  const [listName, setListName] = useState("???");

  let type = "home";
  let folderName = "folderName";

  const GetListName = async () => {
    const data: any[] = (await useGetListData(pathname.split("/")[3])) ?? [];
    const [listData] = data;
    setListName(listData?.title ?? "???");
  };

  if (pathname === "/") {
    type = "home";
  } else if (pathname === "/settings") {
    type = "settings";
  } else if (pathname.startsWith("/folder")) {
    const pathParts = pathname.split("/");
    if (pathParts.length === 3) {
      type = "folder";
      folderName = pathParts[2];
    } else if (pathParts.length === 4) {
      type = "list";
      folderName = pathParts[2];
    }
  }

  useEffect(() => {
    GetListName();
  }, [pathname]);

  const renderLinks = () => {
    return (
      <>
        <Link href={"/"} className="my-auto opacity-50 mr-1">
          Home /
        </Link>
        {type.includes("folder") && (
          <>
            <p className="my-auto">{folderName}</p>
            <EllipsisHorizontalIcon className="ml-auto opacity-50 hover:opacity-100 hover:cursor-pointer transition w-8 h-8 mr-4" />
          </>
        )}
        {type.includes("settings") && <p className="my-auto">settings</p>}
        {type.includes("list") && (
          <>
            <Link
              href={`/folder/${folderName?.toLowerCase()}`}
              className="my-auto opacity-50 mr-1"
            >
              {folderName} /
            </Link>
            <p className="my-auto">{listName}</p>
            <EllipsisHorizontalIcon className="ml-auto opacity-50 hover:opacity-100 hover:cursor-pointer transition w-8 h-8 mr-4" />
          </>
        )}
      </>
    );
  };

  return (
    <div className="w-full py-4 px-2 h-16 flex bg-primary-bg">
      {type.includes("folder") && <>{renderLinks()}</>}
      {type.includes("list") && <>{renderLinks()}</>}
      {type.includes("settings") && <>{renderLinks()}</>}
      {type.includes("home") && <p className="my-auto">Home</p>}
    </div>
  );
}
