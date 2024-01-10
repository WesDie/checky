"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputBox from "./ui/InputBox";
import { useInsertNewCategory } from "@/lib/hooks/useSupabase";
import { useFormStatus, useFormState } from "react-dom"; // Remove unnecessary import
import IconSelectInput from "./IconSelectInput";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-6 py-2 px-8 bg-highlight-color w-fit h-fit mx-auto rounded-full flex gap-1 hover:bg-transparent border-highlight-color border-2 transition disabled:opacity-50 disabled:bg-transparent"
      disabled={pending}
      type="submit"
    >
      <p className="m-auto text-lg">Confirm</p>
    </button>
  );
}

const initialState = {
  message: "",
};

export default function Modal() {
  const [state, formAction] = useFormState(useInsertNewCategory, initialState);
  const [showMessage, setShowMessage] = useState(false);

  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {modal && (
        <>
          <Link href={pathname} className="cursor-default">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary-bg opacity-30 flex"></div>
          </Link>
          <div
            className={`w-[450px] h-fit m-auto bg-dark p-6 rounded absolute top-0 left-0 right-0 bottom-0 flex flex-col`}
          >
            <div className="flex mb-6">
              <p className="text-lg my-auto">Add folder</p>
              <Link
                href={pathname}
                className="h-8 w-8 ml-auto opacity-100 hover:opacity-80 cursor-pointer transition"
              >
                <XMarkIcon></XMarkIcon>
              </Link>
            </div>
            {showMessage && (
              <p
                className={`${
                  state?.message?.startsWith("Red:") ? "text-red" : "text-green"
                } mb-4`}
              >
                {state?.message?.split(": ")[1]}
              </p>
            )}
            <form className="flex flex-col gap-4" action={formAction}>
              <div className="flex gap-4">
                <InputBox
                  value="name"
                  type="text"
                  formattedValue="Name"
                  maxLength={20}
                ></InputBox>
                <IconSelectInput
                  value={"icon"}
                  defaultValue="📄"
                ></IconSelectInput>
              </div>
              <InputBox
                value="description"
                type="text"
                formattedValue="Description"
                maxLength={100}
              ></InputBox>
              <SubmitButton />
            </form>
          </div>
        </>
      )}
    </>
  );
}
