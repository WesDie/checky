"use client";
import { useGetAllEmoji } from "@/lib/hooks/useSupabase";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface emojiPanelProps {
  onClick?: (emoji: string) => void;
}

export default function EmojiPanel({ onClick }: emojiPanelProps) {
  const [emojiData, setEmojiData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const FetchData = async () => {
    const data = await useGetAllEmoji();
    setEmojiData(data || []);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    const handleSearch = debounce((query: string) => {
      setSearchQuery(query);
    }, 300);

    handleSearch(searchQuery);

    return () => {
      handleSearch.cancel();
    };
  }, [searchQuery]);

  const filteredEmojiData = emojiData.filter((emoji: any) =>
    emoji.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading)
    return (
      <>
        <div className="w-[287px] h-[300px] bg-primary-bg p-4 flex gap-4 rounded flex-wrap overflow-auto relative">
          <p className="m-auto opacity-50 absolute top-0 bottom-0 left-0 right-0 w-fit h-fit">
            Loading emojis...
          </p>
        </div>
      </>
    );

  return (
    <>
      <div className="h-fit w-[287px] max-h-[300px] bg-primary-bg p-4 flex gap-4 rounded flex-wrap overflow-auto relative">
        <input
          type="text"
          placeholder="Search emojis"
          value={searchQuery}
          className="w-full h-10 bg-secondary-bg rounded p-2"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {!filteredEmojiData.length && (
          <p className="m-auto opacity-50 absolute top-0 bottom-0 left-0 right-0 w-fit h-fit">
            No matching emojis
          </p>
        )}
        {filteredEmojiData.map((emoji: any, index: number) => (
          <div
            key={index}
            className="w-12 h-12 bg-quaternary-bg rounded-full flex cursor-pointer hover:opacity-50"
            onClick={onClick && (() => onClick(emoji.emoji))}
          >
            <p className="m-auto">{emoji.emoji}</p>
          </div>
        ))}
      </div>
    </>
  );
}
