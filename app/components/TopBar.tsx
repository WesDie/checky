import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  type: string;
  listName?: string;
  folderName?: string;
};

export default function Topbar({ type, listName, folderName }: Props) {
  const renderLinks = () => {
    return (
      <>
        <Link href={"/"} className="my-auto opacity-50 mr-1">
          Home /
        </Link>
        {type.includes("folder") && (
          <p className="my-auto opacity-100">{folderName}</p>
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
          </>
        )}
        <EllipsisHorizontalIcon className="ml-auto opacity-50 hover:opacity-100 hover:cursor-pointer transition w-8 h-8 mr-4" />
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
