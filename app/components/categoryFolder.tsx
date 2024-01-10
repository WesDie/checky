import { CakeIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function categoryFolder(
  index: number,
  category: any
): JSX.Element {
  return (
    <Link
      key={index}
      href={`/folder/${category.name.toLowerCase()}`}
      className="py-2 px-4 bg-secondary-bg flex gap-4 rounded hover:opacity-80 transition cursor-pointer"
    >
      <CakeIcon className="w-10 h-10 my-auto"></CakeIcon>
      <div>
        <p>{category.name}</p>
        <p className="opacity-50">20 lists</p>
      </div>
      <ChevronRightIcon className="w-10 h-10 my-auto ml-auto"></ChevronRightIcon>
    </Link>
  );
}
