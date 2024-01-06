import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  type: string;
  listid?: string;
  categoryid?: string;
};

export default function Topbar({ type, listid, categoryid }: Props) {
  const renderLinks = () => {
    return (
      <>
        <Link href={"/"} className="my-auto opacity-50 mr-1">
          Home /
        </Link>
        {type.includes("list") && (
          <Link href={"/ListCategoryLink"} className="my-auto opacity-50 mr-1">
            ListCategory({listid})
          </Link>
        )}
        <p className="my-auto">{type.includes("list") ? listid : categoryid}</p>
        <EllipsisHorizontalIcon className="ml-auto opacity-50 hover:opacity-100 hover:cursor-pointer transition w-8 h-8 mr-4" />
      </>
    );
  };

  return (
    <div className="w-full py-4 px-2 h-16 flex bg-primary-bg">
      {type.includes("category") && <>{renderLinks()}</>}
      {type.includes("list") && <>{renderLinks()}</>}
      {type.includes("home") && <p className="my-auto">Home</p>}
    </div>
  );
}
