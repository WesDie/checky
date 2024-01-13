"use client";
import { useGetAllEmoji } from "@/lib/hooks/useEmoji";
import { useEffect, useState } from "react";
interface emojiPanelProps {
  onClick?: (emoji: string) => void;
}

export default function EmojiPanel({ onClick }: emojiPanelProps) {
  const [emojiData, setEmojiData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  const FetchData = async () => {
    const data = await useGetAllEmoji();
    setEmojiData(data);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-[287px] h-[300px] bg-primary-bg p-4 flex gap-4 rounded flex-wrap overflow-auto">
      {!emojiData && <p>No data</p>}
      {emojiData &&
        emojiData.map((emoji: any, index: number) => (
          <div
            key={index}
            className="w-12 h-12 bg-quaternary-bg rounded-full flex cursor-pointer hover:opacity-50"
            onClick={onClick && (() => onClick(emoji.character))}
          >
            <p className="m-auto">{emoji.character}</p>
          </div>
        ))}
    </div>
  );
}
