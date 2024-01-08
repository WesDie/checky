import { useState } from "react";

interface InputBoxProps {
  value: string;
  type: string;
  formattedValue: string;
  autoComplete?: string;
}

const InputBox = ({
  value,
  type,
  autoComplete,
  formattedValue,
}: InputBoxProps) => {
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaceholderShown(event.target.value === "");
  };

  return (
    <div className="flex w-full h-[51px] py-2 px-4 bg-tertiary-bg gap-2 rounded-md relative">
      <input
        className={`outline-none w-full bg-transparent placeholder:text-secondary-text transition ${
          !isPlaceholderShown ? "text-sm bottom-2 absolute top-0 pt-4 mt-2" : ""
        }`}
        name={value}
        type={type}
        autoComplete={autoComplete}
        onChange={handleInputChange}
      ></input>
      <label
        className={`text-secondary-text absolute my-auto top-0 bottom-0 h-fit transition ${
          !isPlaceholderShown ? "text-xs m-0 top-auto bottom-auto" : ""
        }`}
      >
        {formattedValue}
      </label>
    </div>
  );
};

export default InputBox;
