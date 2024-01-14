"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface SelectInputProps {
  selectedValue: string;
  value: string;
  options: string[];
  formattedValue: string;
  onChange?: (value: string, valueName: string) => void;
}

const SelectInput = ({
  value,
  selectedValue,
  options,
  formattedValue,
  onChange,
}: SelectInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValueOption, setSelectedValue] = useState(selectedValue);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex w-full h-[51px] py-2 bg-primary-bg gap-2 rounded cursor-pointer relative"
      onClick={toggleOptions}
      ref={optionsRef}
    >
      <input
        name={value}
        value={selectedValueOption}
        className="hidden"
        onChange={() => {}}
      />
      <label className="text-secondary-text absolute top-0 text-xs py-2 px-4">
        {formattedValue}
      </label>
      <p className="outline-none w-11/12 text-ellipsis bg-transparent placeholder:text-secondary-text transition text-sm bottom-2 absolute top-0 pt-4 mt-2 ml-4">
        {selectedValueOption}
      </p>
      {showOptions && (
        <div className="flex flex-col mt-[51px] bg-primary-bg absolute p-2 w-full rounded z-10">
          {options.map((option) => (
            <option
              className="hover:opacity-100 opacity-50 my-1"
              key={option}
              onClick={() => {
                if (onChange) {
                  onChange(option, value);
                }
                handleOptionClick(option);
              }}
            >
              {option}
            </option>
          ))}
        </div>
      )}
      <ChevronDownIcon
        className={`ml-auto w-6 h-6 my-auto mr-4 ${
          showOptions ? "" : "rotate-180"
        } opacity-50 transition`}
      />
    </div>
  );
};

export default SelectInput;
