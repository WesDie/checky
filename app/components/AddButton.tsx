import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  type: string;
  listid?: string;
  categoryid?: string;
};

export default function AddButton({ type, listid, categoryid }: Props) {
  return (
    <>
      <Link
        href="?modal=true&add-folder=true"
        className="mt-auto py-4 px-8 bg-highlight-color w-fit h-fit mx-auto mb-8 rounded-full flex gap-1 hover:bg-transparent border-highlight-color border-2 transition cursor-pointer"
      >
        <PlusIcon className="h-6 w-6 m-auto"></PlusIcon>
        <p className="m-auto text-lg">
          Add {type.includes("category") && "List"}{" "}
          {type.includes("list") && "Item"}
        </p>
      </Link>
    </>
  );
}
