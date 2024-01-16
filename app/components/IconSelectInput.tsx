"use client";
import { useState, useRef, useEffect } from "react";
import EmojiPanel from "./EmojiPanel";

interface selectInputProps {
  value: string;
  defaultValue: string;
}

const IconSelectInput = ({ value, defaultValue }: selectInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isemojiPanelOpen, setIsemojiPanelOpen] = useState(false);
  const emojiPanelRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toString());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPanelRef.current &&
      !emojiPanelRef.current.contains(event.target as Node)
    ) {
      setIsemojiPanelOpen(false);
    }
  };

  const handleEmojiClick = (emojiCharacter: string) => {
    setInputValue(emojiCharacter);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="flex w-[51px] h-[51px] bg-primary-bg rounded-full cursor-pointer hover:opacity-80 transition"
        onClick={() => setIsemojiPanelOpen(!isemojiPanelOpen)}
      >
        <input
          className="hidden"
          type="text"
          name={value}
          value={inputValue}
          onChange={handleChange}
        />
        <p className="m-auto text-2xl align-middle">{inputValue}</p>
      </div>
      <div
        ref={emojiPanelRef}
        className={`absolute top-14 right-0 z-10 ${
          !isemojiPanelOpen ? "hidden" : ""
        }`}
      >
        {isemojiPanelOpen && (
          <EmojiPanel onClick={handleEmojiClick}></EmojiPanel>
        )}
      </div>
    </div>
  );
};

export default IconSelectInput;
