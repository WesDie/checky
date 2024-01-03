interface InputBoxProps {
  value: string;
  type: string;
  formattedValue: string;
  autoComplete: string;
}

const InputBox = ({
  value,
  type,
  autoComplete,
  formattedValue,
}: InputBoxProps) => {
  return (
    <div className="flex w-full h-[51px] py-2 px-4 bg-tertiary-bg gap-2 rounded-md">
      <input
        className="outline-none w-full bg-transparent placeholder:text-secondary-text"
        name={value}
        type={type}
        placeholder={formattedValue}
        autoComplete={autoComplete}
      ></input>
    </div>
  );
};

export default InputBox;
