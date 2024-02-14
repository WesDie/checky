"use client";
import { useState } from "react";
import {
  DocumentDuplicateIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  useGenerateInviteLink,
  useDeleteInviteLink,
} from "@/lib/hooks/useSupabase";

interface InviteGenerateInputProps {
  value: string;
  formattedValue: string;
  defaultValue?: string;
  onChange?: (value: string, valueName: string) => void;
  defaultHasInviteLink?: boolean;
  listid: string;
}

const InviteGenerateInput = ({
  value,
  formattedValue,
  defaultValue,
  onChange,
  defaultHasInviteLink,
  listid,
}: InviteGenerateInputProps) => {
  const [hasInviteLink, setHasInviteLink] = useState(defaultHasInviteLink);
  const [inputValue, seInputValue] = useState(defaultValue || "");
  const [copiedText, setCopiedText] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 2000);
  };

  const GenerateInviteLink = async () => {
    const data = await useGenerateInviteLink(listid);
    if (Array.isArray(data?.data)) {
      seInputValue(window.location.origin + "/invite/" + data.data[0]?.id);
    }
    setHasInviteLink(true);
  };

  const DeleteInviteLink = async () => {
    const error = await useDeleteInviteLink(listid);
    if (!error) {
      seInputValue("");
      setHasInviteLink(false);
    }
  };

  if (!hasInviteLink) {
    return (
      <div
        className={`flex w-full h-[51px] py-2 px-4 bg-primary-bg gap-2 rounded-md relative`}
      >
        <div
          className="mx-auto opacity-50 hover:opacity-100 transition my-auto cursor-pointer"
          onClick={GenerateInviteLink}
        >
          Generate invite link
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full h-[51px] py-2 px-4 bg-primary-bg gap-2 rounded-md relative`}
    >
      <p
        className={`outline-none w-[78%] text-ellipsis bg-transparent placeholder:text-secondary-text transition opacity-50 h-[40px] overflow-hidden truncate ${
          hasInviteLink ? "text-sm bottom-2 absolute top-0 pt-4 mt-2" : ""
        }`}
      >
        {inputValue}
      </p>
      <label
        className={`text-secondary-text absolute my-auto top-0 bottom-0 h-fit transition pointer-events-none ${
          hasInviteLink ? "text-xs m-0 top-auto bottom-auto" : ""
        }`}
      >
        {formattedValue}
      </label>
      <div className="flex gap-2 ml-auto">
        <DocumentDuplicateIcon
          className={`h-5 w-5 my-auto cursor-pointer opacity-50 hover:opacity-100 transition ${
            copiedText ? "hidden" : ""
          }`}
          onClick={() => {
            handleCopy();
          }}
        />
        <CheckIcon
          className={`h-5 w-5 my-auto ml-auto opacity-100 transition ${
            !copiedText ? "hidden" : ""
          }`}
        />
        <XMarkIcon
          className="h-5 w-5 my-auto opacity-50 hover:opacity-100 transition cursor-pointer"
          onClick={() => {
            DeleteInviteLink();
          }}
        />
      </div>
    </div>
  );
};

export default InviteGenerateInput;
