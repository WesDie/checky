import Avatar from "./Avatar";
import { CakeIcon, Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useGetFoldersData } from "@/lib/hooks/useSupabase";
import Link from "next/link";

type Props = {
  currentLink: string;
};

export default async function NavigationBar({ currentLink }: Props) {
  const categories = await useGetFoldersData();

  return (
    <div className="h-full w-fit py-4 px-2 flex flex-col bg-primary-bg">
      <div className="flex flex-col gap-4 px-1">
        <div className="border-b-2 border-tertiary-bg pb-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
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
              <Link key={index} href={`/folder/${category.name.toLowerCase()}`}>
                <CakeIcon
                  className={`opacity-${
                    currentLink === category.name ? "100" : "50"
                  } hover:cursor-pointer transition hover:opacity-100`}
                ></CakeIcon>
              </Link>
            ))}
          <PlusCircleIcon className="opacity-50 hover:opacity-100 hover:cursor-pointer transition"></PlusCircleIcon>
        </div>
      </div>
      <div className="mt-auto mx-auto flex flex-col gap-4">
        <Avatar></Avatar>
        <Cog6ToothIcon className="opacity-100 hover:opacity-80 hover:cursor-pointer transition"></Cog6ToothIcon>
      </div>
    </div>
  );
}
