export async function useGetAllEmoji() {
  try {
    const data = await fetch(
      `https://emoji-api.com/categories/objects?access_key=${process.env.NEXT_PUBLIC_EMOJIAPI}`
    );

    const emojiData = await data.json();

    return emojiData;
  } catch (error) {
    console.error("Failed to fetch emoji data:", error);
    return null;
  }
}
