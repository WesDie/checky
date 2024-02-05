import { useGetUserProfileData } from "@/lib/hooks/useSupabase";
import SettingsForm from "./SettingsForm";

export default async function AppSettings() {
  const data: unknown = await useGetUserProfileData();
  const userData: any = data;
  const email = userData?.email;

  return userData ? <SettingsForm userData={userData} email={email} /> : null;
}
