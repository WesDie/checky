import NavigationBar from "../components/NavigationBar";
import Topbar from "../components/TopBar";
import { useGetUserProfileData } from "@/lib/hooks/useSupabase";
import UserPrefrences from "../components/UserPrefrences";
import Modal from "../components/Modal";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await useGetUserProfileData();

  return (
    <main className="h-full">
      <UserPrefrences userData={userData}>
        <div className="h-full w-full flex">
          <NavigationBar></NavigationBar>
          <div className="flex flex-col h-full w-full">
            <Topbar></Topbar>
            {children}
          </div>
        </div>
        <Modal></Modal>
      </UserPrefrences>
    </main>
  );
}
