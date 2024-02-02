"use client";
import ItemButton from "./ItemButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export default function ItemList({
  items,
}: {
  items: { data: any[] | null; tagData: any[] | null };
}) {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    // async function getSession() {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();
    // }
    // getSession();

    // if (session) {
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
    // }
  }, [supabase, router]);

  const filteredTagData = items?.tagData?.reduce((acc, tag) => {
    if (!acc.find((t: any) => t.name === tag.name)) {
      acc.push(tag);
    }
    return acc;
  }, []);

  const handleTagClick = (tag: any) => {
    console.log(tag);
  };

  return (
    <div className="w-full flex flex-col gap-4 max-h-[82vh] overflow-auto">
      <div className="flex w-full gap-4">
        {items &&
          filteredTagData?.map((tag: any) => (
            <div
              className="p-2 cursor-pointer bg-tertiary-bg rounded text-secondary-text"
              key={tag.id}
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </div>
          ))}
      </div>
      {items && items.data?.length === 0 ? (
        <p className="opacity-50 m-auto">No items in list</p>
      ) : (
        items &&
        items.data?.map((item) => (
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
