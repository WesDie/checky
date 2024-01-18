import ItemList from "@/app/components/ItemList";
import AddButton from "../../../../components/AddButton";
import { useGetItemsInListData } from "@/lib/hooks/useSupabase";

export default async function App({ params }: { params: { listId: number } }) {
  const items = await useGetItemsInListData(params.listId);

  return (
    <>
      <div className="h-full w-full p-6">
        <ItemList items={items || []}></ItemList>
      </div>
      <AddButton type={"list"}></AddButton>
    </>
  );
}
