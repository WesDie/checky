import { useGetProfileData } from "@/lib/hooks/useSupabase";

type Props = {
  tooltip?: boolean;
};

export default async function Avatar({ tooltip }: Props) {
  const userData = await useGetProfileData();

  const profileColors = userData
    ? userData[0]?.profile_colors?.split("||")
    : [];

  const gradientColors = profileColors
    ? `linear-gradient(135deg, ${profileColors[0]}, ${profileColors[1]})`
    : "";

  return (
    <div
      className={`w-full h-full bg-white rounded-full`}
      style={{ background: gradientColors }}
    ></div>
  );
}
