import { useGetCategoriesData } from "@/lib/hooks/useSupabase";
import categoryFolder from "./categoryFolder";

export default async function CategoryList() {
  const categories = await useGetCategoriesData();

  return (
    <div className="flex flex-col gap-4 w-full px-6 py-6">
      {categories &&
        categories.map((category: any, index: number) =>
          categoryFolder(index, category)
        )}
    </div>
  );
}
