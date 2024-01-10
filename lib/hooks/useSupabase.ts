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

  const name = String(formData.get("name")).trim();
  if (name === "") {
    return {
      message: "Red: Please fill in the name field",
    };
  }

  if (existingCategory && existingCategory.length > 0) {
    return {
      message: "Red: Category name already exists please choose another name",
    };
  }

  const { error } = await supabase.from("users_categories_folders").insert({
    name: String(formData.get("name")).replace(/ /g, "-"),
    description: formData.get("description"),
    can_be_edited: true,
    icon: formData.get("icon"),
  });
  revalidatePath("/");

  if (error) {
    return { message: "Red: somthing went wrong" };
  }

  return { message: "Green: Category created successfully" };
}
