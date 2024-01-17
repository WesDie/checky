import { useGetProfileData } from "@/lib/hooks/useSupabase";

type Props = {
  tooltip?: boolean;
};

export default async function Avatar({ tooltip }: Props) {
  const data = await useGetProfileData();

  const profileColors = data ? data[0]?.profile_colors?.split("||") : [];
  const gradientColors = profileColors
    ? `linear-gradient(135deg, ${profileColors[0]}, ${profileColors[1]})`
    : "";

  return (
    <div
      className={`w-8 h-8 bg-white rounded-full opacity-70 hover:opacity-100 hover:cursor-pointer transition`}
      style={{ background: gradientColors }}
    ></div>
  );
}
