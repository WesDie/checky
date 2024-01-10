"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Theme, SkinTones, Emoji } from "emoji-picker-react";

interface selectInputProps {
  value: string;
}

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const IconSelectInput = ({ value }: selectInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isEmoijPanelOpen, setIsEmoijPanelOpen] = useState(false);
  const emoijPanelRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toString());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emoijPanelRef.current &&
      !emoijPanelRef.current.contains(event.target as Node)
    ) {
      setIsEmoijPanelOpen(false);
    }
  };

  const handleEmoijClick = (emoij: any) => {
    setInputValue(emoij.emoji);
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
        className="flex w-[51px] h-[51px] bg-tertiary-bg rounded-full cursor-pointer hover:opacity-80 transition"
        onClick={() => setIsEmoijPanelOpen(!isEmoijPanelOpen)}
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
        ref={emoijPanelRef}
        className={`absolute top-14 right-0 z-10 ${
          !isEmoijPanelOpen ? "hidden" : ""
        }`}
      >
        <Picker
          theme={Theme.DARK}
          skinTonesDisabled={true}
          searchDisabled={true}
          width={350}
          height={400}
          onEmojiClick={(emoji) => handleEmoijClick(emoji)}
        />
      </div>
    </div>
  );
};

export default IconSelectInput;
