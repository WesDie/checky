import ItemList from "@/app/components/ItemList";
import AddButton from "../../../../components/AddButton";
import { useGetItemsInListData } from "@/lib/hooks/useSupabase";

export default async function App({ params }: { params: { listId: number } }) {
  const items = await useGetItemsInListData(params.listId);

  return (
    <>
      <div className="h-full w-full p-6 relative after:absolute after:bg-gradient-to-t after:z-10 after:bottom-0 after:w-full after:h-20 after:from-dark after:to-transparent after:mb-14 after:pointer-events-none">
        <ItemList items={items || []}></ItemList>
      </div>
      <AddButton type={"list"}></AddButton>
    </>
  );
}
