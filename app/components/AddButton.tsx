"use client";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Modal from "./Modal";

type Props = {
  type: string;
  listid?: string;
  categoryid?: string;
};

export default function AddButton({ type, listid, categoryid }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="mt-auto py-4 px-8 bg-highlight-color w-fit h-fit mx-auto mb-8 rounded-full flex gap-1 hover:bg-transparent border-highlight-color border-2 transition cursor-pointer"
      >
        <PlusIcon className="h-6 w-6 m-auto"></PlusIcon>
        <p className="m-auto text-lg">
          Add {type.includes("category") && "List"}{" "}
          {type.includes("list") && "Item"}
        </p>
      </button>
      <Modal isOpen={isOpen} closeModal={closeModal}></Modal>
    </>
  );
}
