"use client";
import Link from "next/link";
import { useClickListItem } from "@/lib/hooks/useSupabase";
import { useState } from "react";

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
  tags: any[] | null | undefined;
}

export default function ItemButton({
  item,
  tags,
}: ItemButtonProps): JSX.Element {
  const [isComplete, setIsComplete] = useState(item.is_checked);

  const MarkAsComplete = async () => {
    useClickListItem(!item.is_checked, item.id, item.listid);
    setIsComplete(!isComplete);
  };

  const allItemTags = tags?.filter((tag) => tag.itemid === item.id);

  return (
    <Link
      className={`w-full min-h-16 py-2 px-4 bg-secondary-bg flex rounded gap-4 cursor-pointer transition active:scale-[99.5%] ${
        item.is_checked ? "opacity-50" : "hover:opacity-80"
      }`}
      href={`?modal=true&edit-list-item=true&item-id=${item.id}`}
    >
      <div
        className={`border-highlight-color border-2  rounded-full min-w-8 min-h-8 my-auto hover:opacity-80 transition ${
          item.is_checked ? "bg-highlight-dark" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          MarkAsComplete();
        }}
      ></div>
      <div className="my-auto">
        <p className="text-ellipsis overflow-hidden h-6 w-full">{item.name}</p>
        <div className="flex gap-1">
          {allItemTags?.map((tag, index) => (
            <p key={index} className="opacity-50 text-sm">
              {tag.name} {index !== allItemTags.length - 1 && "|"}
            </p>
          ))}
        </div>
      </div>
      <h1 className="ml-auto text-2xl my-auto">{item.icon}</h1>
    </Link>
  );
}
