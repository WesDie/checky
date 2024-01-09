"use client";
import { useState } from "react";
import { CakeIcon } from "@heroicons/react/24/solid";

interface selectInputProps {
  value: string;
}

const IconSelectInput = ({ value }: selectInputProps) => {
  const [inputValue, setInputValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  return (
    <div
      className="flex w-[51px] h-[51px] py-2 px-4 bg-tertiary-bg gap-2 rounded-full cursor-pointer hover:opacity-80 transition"
      onClick={() => setInputValue(inputValue + 1)}
    >
      <input
        className="hidden"
        type="number"
        name={value}
        value={inputValue}
        onChange={handleChange}
      />
      <CakeIcon></CakeIcon>
    </div>
  );
};

export default IconSelectInput;
