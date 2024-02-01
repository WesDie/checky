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

  return (
    <div className="w-full flex flex-col gap-4 max-h-[82vh] overflow-auto">
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
