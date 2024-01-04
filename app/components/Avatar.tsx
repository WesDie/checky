import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

type Props = {
  userid?: string;
  tooltip?: boolean;
};

export default async function Avatar({ userid }: Props) {
  if (!userid) {
    return <></>;
  }

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("user_profiles")
    .select("profile_colors")
    .eq("id", session?.user?.id ?? "");

  const profileColors = data ? data[0]?.profile_colors?.split("||") : [];
  const gradientColors = profileColors
    ? `linear-gradient(135deg, ${profileColors[0]}, ${profileColors[1]})`
    : "";

  return (
    <div
      className={`w-8 h-8 bg-white rounded-full opacity-100 hover:opacity-80 hover:cursor-pointer transition`}
      style={{ background: gradientColors }}
    ></div>
  );
}
