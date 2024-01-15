"use client";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  let type = "home";
  let folderName = "folderName";
  let listName = "listName";

  if (pathname === "/") {
    type = "home";
  } else if (pathname === "/settings") {
    type = "settings";
  } else if (pathname.includes("/folder") && !pathname.includes("/list")) {
    type = "folder";
    folderName = pathname.replace("/folder/", "");
  } else if (pathname.includes("/folder") && pathname.includes("/list")) {
    type = "list";
    listName = pathname.substring(pathname.indexOf("/list/") + 6);
    folderName = pathname
      .substring(pathname.indexOf("/folder/") + 8)
      .split("/")[0];
    console.log(folderName);
  }

  const renderLinks = () => {
    return (
      <>
        <Link href={"/"} className="my-auto opacity-50 mr-1">
          Home /
        </Link>
        {type.includes("folder") && (
          <>
            <p className="my-auto opacity-100">{folderName}</p>
            <EllipsisHorizontalIcon className="ml-auto opacity-50 hover:opacity-100 hover:cursor-pointer transition w-8 h-8 mr-4" />
          </>
        )}
        {type.includes("settings") && (
          <p className="my-auto opacity-100">settings</p>
        )}
        {type.includes("list") && (
          <>
            <Link
              href={`/folder/${folderName?.toLowerCase()}`}
              className="my-auto opacity-50 mr-1"
            >
              {folderName} /
            </Link>
            <p className="my-auto opacity-100">{listName}</p>
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
