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

export async function useGetUserProfileData() {
  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", session?.user?.id ?? "");

  return data;
}

export async function useGetFoldersData() {
  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("users_folders")
    .select()
    .eq("userid", session?.user?.id ?? "");

  return data;
}

export async function useInsertNewFolder(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const name = String(formData.get("name")).trim();
  if (name === "") {
    return {
      message: "Red: Please fill in the name field",
    };
  }

  if (name.length > 20 || name.length < 3) {
    return {
      message:
        "Red: Folder name must be less than 20 characters and more than 3 characters",
    };
  }

  const description = formData?.get("description");
  if (typeof description === "string" && description.length > 50) {
    return {
      message: "Red: Folder description must be less than 50 characters",
    };
  }

  if (formData.get("icon") === null) {
    return {
      message: "Red: Please select an icon",
    };
  }

  const { data: existingFolder } = await supabase
    .from("users_folders")
    .select()
    .eq("userid", session?.user?.id ?? "")
    .eq("name", name);

  if (existingFolder && existingFolder.length > 0) {
    return {
      message: "Red: Folder name already exists please choose another name",
    };
  }

  const { error } = await supabase.from("users_folders").insert({
    name: name.replace(/ /g, "-"),
    description: description,
    can_be_edited: true,
    icon: formData.get("icon"),
  });
  revalidatePath("/");

  if (error) {
    return { message: "Red: something went wrong" };
  }

  return { message: "Green: Folder created successfully" };
}

export async function useUpdateUserData(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const { error } = await supabase
    .from("user_profiles")
    .update({
      username: formData.get("username")?.toString(),
      theme: formData.get("theme")?.toString(),
      highlight_colors: formData.get("highlight_color")?.toString(),
    })
    .eq("id", session?.user?.id ?? "");

  revalidatePath("/settings");

  if (error) {
    return { message: "Red: something went wrong" };
  }

  return { message: "Green: Updated values" };
}
