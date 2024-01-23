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
    // throw new Error("No session");
    return { supabase, session: null };
  }

  return { supabase, session };
};

const updateDateForList = async (listId: any) => {
  const { supabase } = await checkUser();

  const { error } = await supabase
    .from("lists")
    .update({
      last_edited: new Date(),
    })
    .eq("id", listId);

  if (error) {
    return { message: "Red: something went wrong" };
  }
};

const checkIfUserIsListMember = async (
  listId: string,
  session: any,
  supabase: any
) => {
  const { data: isListMember } = await supabase
    .from("lists_members")
    .select()
    .eq("listid", listId)
    .eq("userid", session?.user?.id ?? "");

  return { isListMember };
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

  if (session) {
    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", session?.user?.id ?? "");

    const { email } = session?.user ?? {};

    const userProfileData = { ...data, email };

    return userProfileData;
  }
}

export async function useGetListData(listId: string) {
  const { supabase, session } = await checkUser();
  const { isListMember } = await checkIfUserIsListMember(
    listId,
    session,
    supabase
  );
  if (!isListMember) return;

  const { data } = await supabase
    .from("lists")
    .select()
    .eq("id", listId ?? "");

  return data;
}

export async function useGetFoldersData() {
  const { supabase, session } = await checkUser();

  const { data: folderData } = await supabase
    .from("users_folders")
    .select()
    .eq("userid", session?.user?.id ?? "")
    .order("created_at", { ascending: true });

  const listsAmount: any[] = [];

  for (const folder of folderData ?? []) {
    const { data: folderLists } = await supabase
      .from("lists_members")
      .select()
      .eq("user_folderid", folder.id)
      .eq("userid", session?.user?.id ?? "");

    if (folderLists === null || folderLists.length === 0) {
      listsAmount.push(0);
    } else {
      listsAmount.push(folderLists.length);
    }
  }

  return { folderData, listsAmount };
}

export async function useGetListsInFolderData(folder: string) {
  const { supabase, session } = await checkUser();

  // Get Folder ID
  const { data: folderData } = await supabase
    .from("users_folders")
    .select()
    .eq("name", folder ?? "")
    .eq("userid", session?.user?.id ?? "");

  const folderIds = folderData?.map((folder) => folder.id) ?? [];

  // Get All lists ID's where is a member
  const { data: listsData } = await supabase
    .from("lists_members")
    .select()
    .eq("userid", session?.user?.id ?? "")
    .eq("user_folderid", folderIds);

  const listIds = listsData?.map((list) => list.listid) ?? [];

  // Get All lists where is a member plus where folderid is the same as previously fetched folder ID
  const { data: listsInFolder } = await supabase
    .from("lists")
    .select()
    .in("id", listIds)
    .order("last_edited", { ascending: false });

  const itemsAmount: any[] = [];

  for (const list of listsInFolder ?? []) {
    const { data: folderLists } = await supabase
      .from("lists_items")
      .select()
      .eq("listid", list.id);

    if (folderLists === null || folderLists.length === 0) {
      itemsAmount.push(0);
    } else {
      itemsAmount.push(folderLists.length);
    }
  }

  return { listsInFolder, itemsAmount };
}

export async function useGetItemsInListsData(listId: string) {
  const { supabase, session } = await checkUser();
  const { isListMember } = await checkIfUserIsListMember(
    listId,
    session,
    supabase
  );

  if (!isListMember) {
    return { message: "Red: You are not a member of this list" };
  }

  const { data: itemsInList } = await supabase
    .from("users_folders")
    .select()
    .eq("listid", listId ?? "");

  return itemsInList;
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

export async function useInsertNewListItem(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const listId = Number(formData.get("listId"));
  if (!listId) {
    return {
      message: "Red: List is not selected",
    };
  }

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

  const extraInfo = formData?.get("extraInfo");
  if (typeof extraInfo === "string" && extraInfo.length > 100) {
    return {
      message: "Red: Folder description must be less than 50 characters",
    };
  }

  if (formData.get("icon") === null) {
    return {
      message: "Red: Please select an icon",
    };
  }

  const { error } = await supabase.from("lists_items").insert({
    name: name,
    extra_information: extraInfo,
    icon: formData.get("icon"),
    listid: listId,
  });

  if (error) {
    return { message: "Red: something went wrong" };
  }

  updateDateForList(listId);
  return { message: "Green: Item created successfully" };
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
      title: title.replace(/ /g, "-"),
      description: description,
      icon: icon,
    })
    .select();

  const { error: listMemberError } = await supabase
    .from("lists_members")
    .insert({
      role: "member",
      listid: data?.[0].id,
      user_folderid: folderData?.[0].id,
    });

  revalidatePath("/");

  if (listMainError || listMemberError) {
    return { message: "Red: something went wrong" };
  }

  return { message: "Green: Folder created successfully" };
}

export async function useGetAllEmoji() {
  const { supabase } = await checkUser();

  const { data } = await supabase.from("emojis").select("*");

  return data;
}

export async function useGetItemsInListData(listId: number) {
  const { supabase } = await checkUser();

  const { data } = await supabase
    .from("lists_items")
    .select()
    .eq("listid", listId ?? "")
    .order("created_at");

  return data;
}

export async function useClickListItem(
  completed: boolean,
  itemId: number,
  listId: number
) {
  const { supabase } = await checkUser();

  const { data } = await supabase
    .from("lists_items")
    .update({ is_checked: completed })
    .eq("id", itemId ?? "");

  updateDateForList(listId);
  return data;
}

export async function useGetSingleItemInList(listId: string, itemId: string) {
  if (!listId || !itemId) return;

  const { supabase } = await checkUser();

  const { data } = await supabase
    .from("lists_items")
    .select()
    .eq("listid", listId ?? "")
    .eq("id", itemId ?? "");

  return data;
}

export async function useGetSingleFolder(
  folderName: string,
  isFolderModal: boolean
) {
  if (!folderName || !isFolderModal) return;

  const { supabase, session } = await checkUser();

  const { data } = await supabase
    .from("users_folders")
    .select()
    .eq("name", folderName ?? "")
    .eq("userid", session?.user?.id ?? "");

  return data;
}

export async function useUpdateListItem(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();
  const { isListMember } = await checkIfUserIsListMember(
    formData.get("listId")?.toString() ?? "",
    session,
    supabase
  );

  if (!isListMember) {
    return { message: "Red: You are not a member of this list" };
  }

  const { error } = await supabase
    .from("lists_items")
    .update({
      name: formData.get("name"),
      extra_information: formData.get("ExtraInfo"),
      icon: formData.get("icon"),
    })
    .eq("listid", formData.get("listId"))
    .eq("id", formData.get("itemId"));

  if (error) {
    return { message: "Red: something went wrong" };
  }

  updateDateForList(formData.get("listId"));
  return { message: "Green: Item updated successfully" };
}

export async function useUpdateFolderData(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();

  const { error } = await supabase
    .from("users_folders")
    .update({
      name: formData.get("name"),
      description: formData.get("description"),
      icon: formData.get("icon"),
    })
    .eq("userid", session?.user?.id ?? "")
    .eq("name", formData.get("folderName"));

  if (error) {
    return { message: "Red: something went wrong" };
  }

  revalidatePath("/");

  return { message: "Green: Item updated successfully" };
}

export async function useDeleteListItem(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const { supabase, session } = await checkUser();
  const { isListMember } = await checkIfUserIsListMember(
    formData.get("listId")?.toString() ?? "",
    session,
    supabase
  );

  if (!isListMember) {
    return { message: "Red: You are not a member of this list" };
  }

  const { error } = await supabase
    .from("lists_items")
    .delete()
    .eq("listid", formData.get("listId"))
    .eq("id", formData.get("itemId"));

  if (error) {
    return { message: "Red: something went wrong" };
  }

  updateDateForList(formData.get("listId"));
  return { message: "Green: Item deleted successfully" };
}
