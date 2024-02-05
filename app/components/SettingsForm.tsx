"use client";
import { useEffect, useState } from "react";
import InputBox from "./ui/InputBox";
import SelectInput from "./SelectInput";
import { useUpdateUserData } from "@/lib/hooks/useSupabase";
import { useFormStatus, useFormState } from "react-dom";

interface UserData {
  id: string;
  username: string;
  profile_colors: string | null;
  theme: string | null;
  highlight_colors: string | null;
}

const initialState = {
  message: "",
};

export default function SettingsForm({
  userData,
  email,
}: {
  userData: UserData[];
  email: string;
}) {
  const [state, formAction] = useFormState(useUpdateUserData, initialState);
  const [hasChanges, setHasChanges] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.message?.startsWith("Green:")) {
      setHasChanges(false);
    }
  }, [state?.message]);

  const handleChange = (newValue: string, valueName: string) => {
    console.log(newValue, valueName);
    const bodyClasses = document.body.classList;

    // if (valueName === "highlight_color") {
    //   document.body.classList.remove(bodyClasses[2]);

    //   document.body.classList.add(`highlight-${newValue}`);
    // } else if (valueName === "theme") {
    //   if (newValue === "dark") {
    //     document.body.classList.replace("light", `${newValue}`);
    //   } else {
    //     document.body.classList.replace("dark", `${newValue}`);
    //   }
    // }

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
        onChange={handleChange}
      />
      <InputBox
        value="Email"
        type="text"
        formattedValue="Email"
        maxLength={25}
        defaultValue={email ?? ""}
        disabled={true}
      />
      <SelectInput
        selectedValue={theme ?? ""}
        value={"theme"}
        options={["dark", "light"]}
        formattedValue="Theme"
        onChange={handleChange}
      />
      <SelectInput
        selectedValue={highlight_colors ?? ""}
        value={"highlight_color"}
        options={["orange", "blue", "green", "red"]}
        formattedValue="Highlight Color"
        onChange={handleChange}
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
