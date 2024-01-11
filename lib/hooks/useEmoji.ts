export async function useGetAllEmoji() {
  const data = await fetch(
    `https://emoji-api.com/categories/objects?access_key=${process.env.NEXT_PUBLIC_EMOJIAPI}`
  );

  const emojiData = await data.json();

  return emojiData;
}
