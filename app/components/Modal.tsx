"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormStatus, useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import InputBox from "./ui/InputBox";
import InviteGenerateInput from "./InviteGenerateInput";
import IconSelectInput from "./IconSelectInput";
import {
  useInsertNewFolder,
  useInsertNewList,
  useInsertNewListItem,
  useInsertNewListTag,
  useGetSingleItemInList,
  useUpdateListItem,
  useDeleteListItem,
  useUpdateFolderData,
  useGetSingleFolder,
  useUpdateListData,
  useGetSingleList,
  useDeleteList,
  useGetAllTagsFromList,
  useToggleTagRow,
} from "@/lib/hooks/useSupabase";
import CheckMarkInput from "./CheckmarkInput";
import ListMembersInput from "./ListMembersInput";

function SubmitButton() {
  const { pending } = useFormStatus();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className="mt-6 py-2 px-8 bg-highlight-color w-fit h-fit mx-auto rounded-full flex gap-1 hover:bg-transparent border-highlight-color border-2 transition disabled:opacity-50 disabled:bg-transparent"
      disabled={pending}
      type="submit"
      onClick={() => {
        router.push(pathname);
      }}
    >
      <p className="m-auto text-lg">Confirm</p>
    </button>
  );
}

const initialState = {
  message: "",
};

export default function Modal() {
  const [stateInsertFolder, formActionInsertFolder] = useFormState(
    useInsertNewFolder,
    initialState
  );
  const [stateInsertList, formActionInsertList] = useFormState(
    useInsertNewList,
    initialState
  );
  const [stateInsertListItem, formActionInsertListItem] = useFormState(
    useInsertNewListItem,
    initialState
  );
  const [stateInsertListTag, formActionInsertListTag] = useFormState(
    useInsertNewListTag,
    initialState
  );
  const [stateUpdateListItem, formActionUpdateListItem] = useFormState(
    useUpdateListItem,
    initialState
  );
  const [stateDeleteListItem, formActionDeleteListItem] = useFormState(
    useDeleteListItem,
    initialState
  );
  const [stateDeleteList, formActionDeleteList] = useFormState(
    useDeleteList,
    initialState
  );
  const [stateUpdateFolderData, formActionUpdateFolderData] = useFormState(
    useUpdateFolderData,
    initialState
  );
  const [stateUpdateListData, formActionUpdateListData] = useFormState(
    useUpdateListData,
    initialState
  );

  const [itemData, setItemData] = useState<any[] | null>(null);
  const [itemTagData, setItemTagData] = useState<any[] | null>(null);
  const [itemDataLoading, setItemDataLoading] = useState(false);

  const [folderData, setFolderData] = useState<any[] | null>(null);
  const [folderDataLoading, setFolderDataLoading] = useState(false);

  const [listData, setListData] = useState<any[] | null>(null);
  const [listMemberData, setListMemeberData] = useState<any[] | null>(null);
  const [listInviteData, setListInviteData] = useState<any[] | null>(null);
  const [listDataLoading, setListDataLoading] = useState(false);

  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const addFolderModal = searchParams.get("add-folder");
  const addListModal = searchParams.get("add-list");
  const addListItemModal = searchParams.get("add-list-item");
  const editFolderModal = searchParams.get("edit-folder");
  const editListModal = searchParams.get("edit-list");
  const editListItemModal = searchParams.get("edit-list-item");
  const addListTagModal = searchParams.get("add-list-tag");

  const pathname = usePathname();
  const router = useRouter();
  const folderName = pathname.split("/")[2];
  const listId = pathname.split("/")[3];
  const itemId = searchParams.get("item-id");

  const [newFolderName, setNewFolderName] = useState(folderName);

  const GetSingleItemData = async () => {
    setItemDataLoading(true);
    const listItemData = await useGetSingleItemInList(listId, itemId || "");
    const listItemTagData = await useGetAllTagsFromList(listId);
    setItemDataLoading(false);
    setItemData(listItemData as any[] | null);

    const filteredSelectedItemTagData = listItemTagData?.filter(
      (tag) => tag.itemid === listItemData?.[0].id
    );

    const filteredNotSelectedItemTagData =
      listItemTagData?.reduce((acc, tag) => {
        if (
          !filteredSelectedItemTagData?.find((t) => t.name === tag.name) &&
          !acc.find((t: { name: any }) => t.name === tag.name)
        ) {
          acc.push(tag);
        }
        return acc;
      }, []) || [];

    const filteredItemTagData = [
      ...(filteredSelectedItemTagData || []),
      ...filteredNotSelectedItemTagData,
    ];

    setItemTagData(filteredItemTagData as any[] | null);
  };

  const GetSingleFolderData = async () => {
    setFolderDataLoading(true);
    const folderData = await useGetSingleFolder(folderName, !!editFolderModal);
    setFolderDataLoading(false);
    setFolderData(folderData as any[] | null);
  };

  const GetSingleListData = async () => {
    setListDataLoading(true);
    const data = await useGetSingleList(listId, !!editListModal);
    setListDataLoading(false);
    setListData(data?.data as any[] | null);
    setListMemeberData(data?.listMembers as any[] | null);
    setListInviteData(data?.listInvite as any[] | null);
  };

  const handleNewFolderNameChange = (newValue: string) => {
    setNewFolderName(newValue);
  };

  const ToggleTag = (
    tagId: string,
    listId: string,
    itemid: string,
    isSelected: boolean
  ) => {
    useToggleTagRow(tagId, listId, itemid, isSelected);
  };

  useEffect(() => {
    GetSingleItemData();
    GetSingleFolderData();
    GetSingleListData();
  }, [modal, itemId, editListItemModal, listId]);

  if (!modal || searchParams.size !== 2) {
    if (!itemId && searchParams.size !== 3) {
      return null;
    }
  }

  return (
    <>
      <Link href={pathname} className="cursor-default">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary-bg opacity-30 flex z-20"></div>
      </Link>
      <div className="w-[450px] h-fit m-auto bg-dark p-6 rounded absolute top-0 left-0 right-0 bottom-0 flex flex-col shadow-dark drop-shadow-lg z-30">
        <div className="flex mb-6">
          <p className="text-lg my-auto">
            {addFolderModal
              ? "Add Folder"
              : addListModal
              ? "Add List"
              : addListItemModal
              ? "Add Item"
              : editListItemModal
              ? "Edit Item"
              : addListTagModal
              ? "Add Tag"
              : editFolderModal
              ? "Edit Folder"
              : editListModal
              ? "Edit List"
              : ""}
          </p>
          <Link
            href={pathname}
            className="h-8 w-8 ml-auto opacity-100 hover:opacity-80 cursor-pointer transition"
          >
            <XMarkIcon></XMarkIcon>
          </Link>
        </div>
        {/* <p
          className={`${
            stateInsertFolder?.message?.startsWith("Red:")
              ? "text-red"
              : "text-green"
          } mb-4`}
        >
          {stateInsertFolder?.message?.split(": ")[1]}
        </p> */}
        {addFolderModal && (
          <form className="flex flex-col gap-4" action={formActionInsertFolder}>
            <div className="flex gap-4">
              <InputBox
                value="name"
                type="text"
                formattedValue="Name"
                maxLength={50}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue="📝"
              ></IconSelectInput>
            </div>
            <InputBox
              value="description"
              type="text"
              formattedValue="Description"
              maxLength={150}
            ></InputBox>
            <SubmitButton />
          </form>
        )}
        {addListModal && (
          <form className="flex flex-col gap-4" action={formActionInsertList}>
            <div className="flex gap-4">
              <InputBox
                value="title"
                type="text"
                formattedValue="Title"
                maxLength={50}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue="📝"
              ></IconSelectInput>
            </div>
            <InputBox
              value="description"
              type="text"
              formattedValue="Description"
              maxLength={150}
            ></InputBox>
            <input type="hidden" value={folderName} name="folderName"></input>
            <SubmitButton />
          </form>
        )}
        {addListItemModal && (
          <form
            className="flex flex-col gap-4"
            action={formActionInsertListItem}
          >
            <div className="flex gap-4">
              <InputBox
                value="name"
                type="text"
                formattedValue="Name"
                maxLength={150}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue="🎁"
              ></IconSelectInput>
            </div>
            <InputBox
              value="extraInfo"
              type="text"
              formattedValue="Extra information"
              maxLength={250}
            ></InputBox>
            <input type="hidden" value={listId} name="listId"></input>
            <SubmitButton />
          </form>
        )}
        {addListTagModal && (
          <form
            className="flex flex-col gap-4"
            action={formActionInsertListTag}
          >
            <InputBox
              value="name"
              type="text"
              formattedValue="Name"
              maxLength={150}
            ></InputBox>
            <input type="hidden" value={listId} name="listId"></input>
            <SubmitButton />
          </form>
        )}
        {(itemDataLoading && editListItemModal) ||
        (folderDataLoading && editFolderModal) ||
        (listDataLoading && editListModal) ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-full h-[51px] animate-pulse bg-primary-bg rounded-md"></div>
              <div className="w-[51px] h-[51px] animate-pulse rounded-full bg-primary-bg"></div>
            </div>
            <div className="w-full h-[51px] animate-pulse bg-primary-bg rounded-md"></div>
            <div className="flex gap-4 w-fit mx-auto">
              <div className="mt-6 py-2 px-8 h-[48px] w-[120px] animate-pulse bg-primary-bg rounded-full"></div>
              <div className="mt-6 py-2 px-8 h-[48px] w-[120px] animate-pulse bg-primary-bg rounded-full"></div>
            </div>
          </div>
        ) : null}
        {editListModal && !listDataLoading ? (
          <form
            className="flex flex-col gap-4"
            action={formActionUpdateListData}
          >
            <div className="flex gap-4">
              <InputBox
                value="name"
                type="text"
                formattedValue="Name"
                maxLength={50}
                defaultValue={listData?.[0].title ?? ""}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue={listData?.[0].icon ?? ""}
              ></IconSelectInput>
            </div>
            <InputBox
              value="description"
              type="text"
              formattedValue="Description"
              maxLength={150}
              defaultValue={listData?.[0].description ?? ""}
            ></InputBox>
            <InviteGenerateInput
              value="sharelink"
              formattedValue="Share link"
              defaultValue={
                window.location.origin + "/invite/" + listInviteData?.[0]?.id ??
                ""
              }
              listid={listData?.[0].id ?? ""}
              defaultHasInviteLink={listInviteData?.[0]?.id !== undefined}
            ></InviteGenerateInput>
            <CheckMarkInput
              value={"deleteOnComplete"}
              displayValue="Delete items on complete"
              defaultValue={listData?.[0].delete_on_complete}
            ></CheckMarkInput>
            {listMemberData && (
              <ListMembersInput listMembers={listMemberData}></ListMembersInput>
            )}
            <input type="hidden" value={listId} name="listId"></input>
            <div className="flex gap-4 w-fit mx-auto">
              <SubmitButton />
              <button
                className="mt-6 py-2 px-8 hover:bg-red w-fit h-fit mx-auto rounded-full flex gap-1 bg-transparent border-red border-2 transition disabled:opacity-50 disabled:bg-transparent"
                formAction={formActionDeleteList}
                type="submit"
                onClick={() => {
                  const newPathnameFolder = pathname.slice(
                    0,
                    pathname.lastIndexOf("/")
                  );
                  router.push(newPathnameFolder);
                }}
              >
                <p className="m-auto text-lg">Delete</p>
              </button>
            </div>
          </form>
        ) : null}
        {editFolderModal && !folderDataLoading ? (
          <form
            className="flex flex-col gap-4"
            action={formActionUpdateFolderData}
            onSubmit={() => {
              setTimeout(() => {
                if (newFolderName) {
                  router.push("/folder/" + newFolderName);
                }
              }, 100);
            }}
          >
            <div className="flex gap-4">
              <InputBox
                value="name"
                type="text"
                formattedValue="Name"
                maxLength={50}
                onChange={handleNewFolderNameChange}
                defaultValue={folderData?.[0].name ?? ""}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue={folderData?.[0].icon ?? ""}
              ></IconSelectInput>
            </div>
            <InputBox
              value="description"
              type="text"
              formattedValue="Description"
              maxLength={150}
              defaultValue={folderData?.[0].description ?? ""}
            ></InputBox>
            <input type="hidden" value={folderName} name="folderName"></input>
            <SubmitButton />
          </form>
        ) : null}
        {editListItemModal && !itemDataLoading ? (
          <form
            className="flex flex-col gap-4"
            action={formActionUpdateListItem}
          >
            <div className="flex gap-4">
              <InputBox
                value="name"
                type="text"
                formattedValue="Name"
                maxLength={150}
                defaultValue={itemData?.[0].name ?? ""}
              ></InputBox>
              <IconSelectInput
                value={"icon"}
                defaultValue={itemData?.[0].icon ?? ""}
              ></IconSelectInput>
            </div>
            <InputBox
              value="ExtraInfo"
              type="text"
              formattedValue="Extra information"
              maxLength={250}
              defaultValue={itemData?.[0].extra_information ?? ""}
            ></InputBox>
            <div className="flex gap-2">
              {itemTagData?.map((tag) => (
                <div
                  onClick={() =>
                    ToggleTag(
                      tag.id,
                      listId,
                      itemData?.[0].id,
                      tag.itemid === itemData?.[0].id
                    )
                  }
                  key={tag.id}
                  className={`p-2 ${
                    tag.itemid === itemData?.[0].id
                      ? "bg-white"
                      : "bg-primary-bg"
                  } text-secondary-text rounded cursor-pointer`}
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <input type="hidden" value={listId} name="listId"></input>
            <input type="hidden" value={itemId ?? ""} name="itemId"></input>
            <div className="flex gap-4 w-fit mx-auto">
              <SubmitButton />
              <button
                className="mt-6 py-2 px-8 hover:bg-red w-fit h-fit mx-auto rounded-full flex gap-1 bg-transparent border-red border-2 transition disabled:opacity-50 disabled:bg-transparent"
                formAction={formActionDeleteListItem}
                type="submit"
                onClick={() => {
                  router.push(pathname);
                }}
              >
                <p className="m-auto text-lg">Delete</p>
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}
