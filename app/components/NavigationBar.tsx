import Avatar from "./Avatar";
import NavCategoriesList from "./NavCategoriesList";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useGetFoldersData } from "@/lib/hooks/useSupabase";
import Link from "next/link";

export default async function NavigationBar() {
  const categories = await useGetFoldersData();

  return (
    <div className="h-full w-fit py-4 px-2 flex flex-col bg-primary-bg">
      <div className="flex flex-col gap-4 px-1">
        <div className="border-b-2 border-tertiary-bg pb-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <NavCategoriesList categories={categories}></NavCategoriesList>
      </div>
      <div className="mt-auto mx-auto flex flex-col gap-4">
        <div className="h-8 w-8 opacity-70 hover:opacity-100 hover:cursor-pointer transition">
          <Avatar></Avatar>
        </div>
        <Link href={"/settings"}>
          <Cog6ToothIcon className="opacity-70 hover:opacity-100 hover:cursor-pointer transition hover:scale-95"></Cog6ToothIcon>
        </Link>
      </div>
    </div>
  );
}
