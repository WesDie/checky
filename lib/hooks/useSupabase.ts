"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { revalidatePath } from "next/cache";

const checkUser = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No session");
  }

  return { supabase, session };
};

export async function useGetProfileData() {
  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("user_profiles")
    .select("profile_colors")
    .eq("id", session?.user?.id ?? "");

  return data;
}

export async function useGetCategoriesData() {
  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("users_categories_folders")
    .select()
    .eq("userid", session?.user?.id ?? "");

  return data;
}

export async function useInsertNewCategory(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const { data: existingCategory } = await supabase
    .from("users_categories_folders")
    .select()
    .eq("userid", session?.user?.id ?? "")
    .eq("name", formData.get("name"));

  if (existingCategory && existingCategory.length > 0) {
    return {
      message: "Category name already exists please choose another name",
    };
  }

  const { error } = await supabase.from("users_categories_folders").insert({
    name: formData.get("name"),
    description: formData.get("description"),
    can_be_edited: true,
    icon: formData.get("iconNumber"),
  });
  revalidatePath("/");

  if (error) {
    return { message: "somthing went wrong" };
  }

  return { message: "Category created successfully" };
}
