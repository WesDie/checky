import Avatar from "./Avatar";
import { Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  userid?: string;
};

export default function NavigationBar({ userid }: Props) {
  return (
    <div className="h-full w-fit py-4 px-2 flex flex-col bg-primary-bg">
      <div className="flex flex-col gap-4 px-1">
        <div className="border-b-2 border-tertiary-bg pb-4">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
        <div className="flex flex-col gap-4 h-fit">
          <HomeIcon className="opacity-100 hover:cursor-pointer transition"></HomeIcon>
          {[...Array(3)].map((_, index) => (
            <HomeIcon
              key={index}
              className="opacity-50 hover:opacity-100 hover:cursor-pointer transition"
            ></HomeIcon>
          ))}
          <PlusCircleIcon className="opacity-50 hover:opacity-100 hover:cursor-pointer transition"></PlusCircleIcon>
        </div>
      </div>
      <div className="mt-auto mx-auto flex flex-col gap-4">
        <Avatar userid={userid}></Avatar>
        <Cog6ToothIcon className="opacity-100 hover:opacity-80 hover:cursor-pointer transition"></Cog6ToothIcon>
      </div>
    </div>
  );
}
