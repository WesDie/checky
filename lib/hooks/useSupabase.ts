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

  const { email } = session?.user ?? {};

  const userProfileData = { ...data, email };

  return userProfileData;
}

export async function useGetFoldersData() {
  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("users_folders")
    .select()
    .eq("userid", session?.user?.id ?? "");

  return data;
}

export async function useGetListsInFolderData(folder: string) {
  const { supabase, session } = await checkUser();

  // Get Folder ID
  const { data: folderData } = await supabase
    .from("users_folders")
    .select()
    .eq("name", folder ?? "")
    .eq("userid", session?.user?.id ?? "");

  // Get All lists ID's where is a member
  const { data: listsData } = await supabase
    .from("lists_members")
    .select()
    .eq("userid", session?.user?.id ?? "");

  const folderIds = folderData?.map((folder) => folder.id) ?? [];
  const listIds = listsData?.map((list) => list.listid) ?? [];

  // Get All lists where is a member plus where folderid is the same as previously fetched folder ID
  const { data: listsInFolder } = await supabase
    .from("lists")
    .select()
    .in("id", listIds)
    .in("folderid", folderIds);

  return listsInFolder;
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

  if (
    formData.get("username") === "" ||
    formData.get("theme") === "" ||
    formData.get("highlight_color") === ""
  ) {
    return {
      message: "Red: Please fill in all the fields",
    };
  }

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

export async function useInsertNewList(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const icon = formData.get("icon")?.toString();
  const folderName = formData.get("folderName")?.toString();

  if (!title || !icon) {
    return {
      message: "Red: Please fill in all the fields",
    };
  }
  if (title.length > 20 || title.length < 3) {
    return {
      message:
        "Red: List title must be less than 20 characters and more than 3 characters",
    };
  }
  if (description && description.length > 50) {
    return {
      message: "Red: List description must be less than 50 characters",
    };
  }
  if (!folderName) {
    return {
      message: "Red: There is no folder selected",
    };
  }

  const { data: folderData } = await supabase
    .from("users_folders")
    .select()
    .eq("userid", session?.user?.id ?? "")
    .eq("name", folderName ?? "");

  const { data, error: listMainError } = await supabase
    .from("lists")
    .insert({
      title: title,
      description: description,
      icon: icon,
      folderid: folderData?.[0].id,
    })
    .select();

  const { error: listMemberError } = await supabase
    .from("lists_members")
    .insert({
      role: "member",
      listid: data?.[0].id,
    });

  revalidatePath("/");

  if (listMainError || listMemberError) {
    console.log(listMainError, listMemberError);
    return { message: "Red: something went wrong" };
  }

  return { message: "Green: Folder created successfully" };
}
