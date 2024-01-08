"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SelectInputProps {
  selectedValue: string;
  value: string;
  options: string[];
}

const SelectInput = ({ value, selectedValue, options }: SelectInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValueOption, setSelectedValue] = useState(selectedValue);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
  };

  return (
    <div
      className="flex w-full h-[51px] py-2 px-4 bg-tertiary-bg gap-2 rounded cursor-pointer relative"
      onClick={toggleOptions}
    >
      <input
        name={value}
        value={selectedValueOption}
        className="hidden"
        onChange={() => {}}
      />
      <p className="text-primary-text my-auto">{selectedValueOption}</p>
      {showOptions && (
        <div className="flex flex-col mt-[51px] gap-2 bg-tertiary-bg absolute p-2 w-full rounded">
          {options.map((option) => (
            <option
              className="hover:opacity-100 opacity-50"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </option>
          ))}
        </div>
      )}
      <ChevronDownIcon
        className={`ml-auto w-6 h-6 my-auto ${
          showOptions ? "" : "rotate-180"
        } opacity-50 transition`}
      />
    </div>
  );
};

export default SelectInput;
