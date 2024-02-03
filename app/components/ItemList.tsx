"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
import ItemButton from "./ItemButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export default function ItemList({
  items,
}: {
  items: { data: any[] | null; tagData: any[] | null };
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
        filteredTagData.some(
          (tag: any) =>
            selectedTags.includes(tag.name) && tag.itemid === item.id
        )
      )
    : items?.data;

  return (
    <div className="w-full flex flex-col gap-4 max-h-[82vh] overflow-auto">
      <div className="flex w-full gap-4">
        {items &&
          filteredTagData?.map((tag: any) => (
            <div
              className={`p-2 cursor-pointer rounded text-secondary-text ${
                selectedTags.includes(tag.name) ? "bg-white" : " bg-tertiary-bg"
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
      </div>
      {filteredItems && filteredItems.length === 0 ? (
        <p className="opacity-50 m-auto">No items in list</p>
      ) : (
        filteredItems &&
        filteredItems.map((item) => (
          <ItemButton
            item={item}
            tags={items.tagData}
            key={item.id}
          ></ItemButton>
        ))
      )}
    </div>
  );
}
