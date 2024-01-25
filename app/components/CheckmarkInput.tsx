"use client";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface selectInputProps {
  value: string;
  displayValue: string;
  defaultValue: boolean;
}

const CheckMarkInput = ({
  value,
  displayValue,
  defaultValue,
}: selectInputProps) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue || false);

  return (
    <div className="flex flex-col gap-1 relative">
      <p className=" text-secondary-text">{displayValue}</p>
      <input
        type="checkbox"
        name={value}
        value={isEnabled.toString()}
        onClick={() => setIsEnabled(!isEnabled)}
        className="appearance-none w-8 h-8 rounded bg-primary-bg cursor-pointer"
      />
      {isEnabled ? (
        <CheckIcon className="absolute bottom-0 fill-white w-8 h-8 p-1 pointer-events-none" />
      ) : null}
    </div>
  );
};

export default CheckMarkInput;
