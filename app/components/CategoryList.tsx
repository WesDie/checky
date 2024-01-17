import { useGetFoldersData } from "@/lib/hooks/useSupabase";
import categoryFolder from "./CategoryFolder";

export default async function CategoryList() {
  const categories = await useGetFoldersData();

  return (
    <div className="flex flex-col gap-4 w-full px-6 py-6">
      {categories &&
        categories &&
        categories.folderData &&
        categories.folderData.map((category: any, index: number) =>
          categoryFolder(index, category, categories.listsAmount[index])
        )}
    </div>
  );
}
