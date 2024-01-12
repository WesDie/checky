"use client";
import { useState } from "react";

interface InputBoxProps {
  value: string;
  type: string;
  formattedValue: string;
  autoComplete?: string;
  maxLength?: number;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const InputBox = ({
  value,
  type,
  autoComplete,
  formattedValue,
  maxLength,
  defaultValue,
  onChange,
}: InputBoxProps) => {
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(
    defaultValue ? false : true
  );
  const [inputValue, seInputValue] = useState(defaultValue || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaceholderShown(event.target.value === "");
    seInputValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  return (
    <div className="flex w-full h-[51px] py-2 px-4 bg-primary-bg gap-2 rounded-md relative">
      <input
        className={`outline-none w-11/12 text-ellipsis bg-transparent placeholder:text-secondary-text transition ${
          !isPlaceholderShown ? "text-sm bottom-2 absolute top-0 pt-4 mt-2" : ""
        }`}
        maxLength={maxLength}
        name={value}
        type={type}
        autoComplete={autoComplete}
        onChange={handleInputChange}
        value={inputValue}
      ></input>
      <label
        className={`text-secondary-text absolute my-auto top-0 bottom-0 h-fit transition pointer-events-none ${
          !isPlaceholderShown ? "text-xs m-0 top-auto bottom-auto" : ""
        }`}
      >
        {formattedValue}
      </label>
    </div>
  );
};

export default InputBox;
