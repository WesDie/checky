"use client";
import { useEffect, useState } from "react";
import InputBox from "./ui/InputBox";
import SelectInput from "./selectInput";
import { useUpdateUserData } from "@/lib/hooks/useSupabase";
import { useFormStatus, useFormState } from "react-dom";

interface UserData {
  id: string;
  username: string;
  profile_colors: string | null;
  theme: string | null;
  highlight_colors: string | null;
  email: string;
}

const initialState = {
  message: "",
};

export default function SettingsForm({ userData }: { userData: UserData[] }) {
  const [state, formAction] = useFormState(useUpdateUserData, initialState);
  const [hasChanges, setHasChanges] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.message?.startsWith("Green:")) {
      setHasChanges(false);
    }
  }, [state?.message]);

  const handleInputChange = () => {
    setHasChanges(true);
  };

  const handleSelectChange = () => {
    setHasChanges(true);
  };

  const { username, theme, highlight_colors } = userData[0] || {};

  return (
    <form className="p-6 flex flex-col gap-4 h-full" action={formAction}>
      <InputBox
        value="username"
        type="text"
        formattedValue="Username"
        maxLength={25}
        defaultValue={username ?? ""}
        onChange={handleInputChange}
      />
      <InputBox
        value="Email"
        type="text"
        formattedValue="Email"
        maxLength={25}
        defaultValue={userData[0].email ?? ""}
        onChange={handleInputChange}
        disabled={true}
      />
      <SelectInput
        selectedValue={theme ?? ""}
        value={"theme"}
        options={["dark", "light"]}
        formattedValue="Theme"
        onChange={handleSelectChange}
      />
      <SelectInput
        selectedValue={highlight_colors ?? ""}
        value={"highlight_color"}
        options={["orange", "blue", "green", "purple", "pink", "red"]}
        formattedValue="Highlight Color"
        onChange={handleSelectChange}
      />
      <p
        className={`${
          state?.message?.startsWith("Red:") ? "text-red" : "text-green"
        } mb-4`}
      >
        {state?.message?.split(": ")[1]}
      </p>
      {hasChanges && !pending && (
        <button
          className="mt-auto py-4 px-8 bg-highlight-color w-fit h-fit mx-auto mb-2 rounded-full flex gap-1 hover:bg-transparent border-highlight-color border-2 transition cursor-pointer"
          disabled={pending}
          type="submit"
        >
          <p className="m-auto text-lg">Save</p>
        </button>
      )}
    </form>
  );
}
