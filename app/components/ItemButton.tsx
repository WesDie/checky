"use client";
import Link from "next/link";
import { useClickListItem } from "@/lib/hooks/useSupabase";
// import { useState } from "react";

interface ItemButtonProps {
  item: {
    id: number;
    listid: number;
    name: string;
    icon: string;
    extra_information: string;
    created_at: string;
    is_checked: boolean;
  };
}

export default function ItemButton({ item }: ItemButtonProps): JSX.Element {
  // const [isComplete, setIsComplete] = useState(item.is_checked);
  const markAsComplete = async () => {
    useClickListItem(!item.is_checked, item.id);
    // setIsComplete(!isComplete);
  };

  return (
    <div
      className={`w-full py-2 px-4 bg-secondary-bg flex rounded gap-4 cursor-pointer transition active:scale-[99%] ${
        item.is_checked ? "opacity-50" : "hover:opacity-80"
      }`}
      onClick={() => markAsComplete()}
    >
      <div
        className={`border-highlight-color border-2  rounded-full w-8 h-8 my-auto hover:opacity-80 transition ${
          item.is_checked ? "bg-highlight-dark" : ""
        }`}
      ></div>
      <div className="my-auto">
        <Link className="hover:underline" href="?modal=true&edit-list-item">
          {item.name}
        </Link>
        <p className="opacity-50 text-sm">1kg | Important</p>
      </div>
      <h1 className="ml-auto text-2xl my-auto">{item.icon}</h1>
    </div>
  );
}