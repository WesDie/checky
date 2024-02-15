"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
import ItemButton from "./ItemButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function ItemList({
  items,
}: {
  items: { data?: any[] | null; tagData?: any[] | null; message?: string };
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("lists_items")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lists_items",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const filteredTagData = items?.tagData?.reduce((acc, tag) => {
    if (!acc.find((t: any) => t.name === tag.name)) {
      acc.push(tag);
    }
    return acc;
  }, []);

  const handleTagClick = (tag: any) => {
    if (selectedTags.includes(tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag.name]);
    }
  };

  const filteredItems = selectedTags.length
    ? items?.data?.filter((item) =>
        items?.tagData?.some(
          (tag: any) =>
            selectedTags.includes(tag.name) && tag.itemid === item.id
        )
      )
    : items?.data;

  return (
    <div className="w-full flex flex-col gap-4 max-h-[82vh] overflow-auto">
      <div className="flex w-full gap-2">
        {items &&
          filteredTagData?.map((tag: any) => (
            <div
              className={`p-2 cursor-pointer rounded text-secondary-text transition ${
                selectedTags.includes(tag.name)
                  ? "bg-white"
                  : " bg-tertiary-bg hover:opacity-80"
              } ${
                selectedTags.length > 0 && !selectedTags.includes(tag.name)
                  ? "opacity-50"
                  : ""
              }`}
              key={tag.id}
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </div>
          ))}
        <Link
          className="h-10 p-2 w-10 bg-tertiary-bg my-auto rounded flex hover:opacity-80 transition cursor-pointer"
          href={"?modal=true&add-list-tag=true"}
        >
          <PlusIcon className="opacity-50"></PlusIcon>
        </Link>
      </div>
      {filteredItems && filteredItems.length === 0 ? (
        <p className="opacity-50 m-auto">No items in list</p>
      ) : (
        filteredItems &&
        filteredItems.map((item) => (
          <ItemButton
            item={item}
            tags={items?.tagData}
            key={item.id}
          ></ItemButton>
        ))
      )}
    </div>
  );
}
