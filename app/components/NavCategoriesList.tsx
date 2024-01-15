"use client";
import { CakeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  categories: any;
};

export default function NavCategoriesList({ categories }: Props) {
  const currentLink = usePathname();
  const folderName = currentLink.match(/folder\/([^/]+)/)?.[1];

  return (
    <div className="flex flex-col gap-4 h-fit">
      <Link href={`/`}>
        <HomeIcon
          className={`opacity-${
            currentLink === "/" ? "100" : "50"
          } hover:cursor-pointer transition hover:opacity-100`}
        />
      </Link>
      {categories &&
        categories.map((category: any, index: number) => (
          <Link key={index} href={`/folder/${category.name}`}>
            <CakeIcon
              className={`opacity-${
                folderName === `${category.name}` ? "100" : "50"
              } hover:cursor-pointer transition hover:opacity-100`}
            ></CakeIcon>
          </Link>
        ))}
      <Link
        href="?modal=true&add-folder=true"
        className="opacity-50 hover:opacity-100 hover:cursor-pointer transition"
      >
        <PlusCircleIcon></PlusCircleIcon>
      </Link>
    </div>
  );
}
