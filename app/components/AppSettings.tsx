import { useGetUserProfileData } from "@/lib/hooks/useSupabase";
import SettingsForm from "./SettingsForm";

interface UserData {
  id: string;
  username: string;
  profile_colors: string | null;
  theme: string | null;
  highlight_colors: string | null;
  email: string;
}

export default async function AppSettings() {
  const data: unknown = await useGetUserProfileData();
  const userData: UserData[] | null = data as UserData[] | null;

  return userData ? <SettingsForm userData={userData} /> : null;
}
