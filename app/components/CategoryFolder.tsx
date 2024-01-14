import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function categoryFolder(
  index: number,
  category: any
): JSX.Element {
  return (
    <Link
      key={index}
      href={`/folder/${category.name}`}
      className="py-2 px-4 bg-secondary-bg flex gap-4 rounded hover:opacity-80 transition cursor-pointer"
    >
      <div className="flex w-[50px] h-[50px] my-auto bg-quaternary-bg rounded-full">
        <p className="m-auto text-3xl">{category.icon}</p>
      </div>
      <div>
        <p>{category.name}</p>
        <p className="opacity-50">20 lists</p>
      </div>
      <ChevronRightIcon className="w-8 h-8 my-auto ml-auto opacity-50"></ChevronRightIcon>
    </Link>
  );
}
