import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Modal from "./components/Modal";
import "./globals.css";
import { useGetUserProfileData } from "@/lib/hooks/useSupabase";
import UserPrefrences from "./components/UserPrefrences";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checky",
  description: "a list app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await useGetUserProfileData();

  return (
    <html lang="en">
      <body className={`${quicksand.className}`}>
        {userData && (
          <UserPrefrences userData={userData}>
            {children}
            <Modal></Modal>
          </UserPrefrences>
        )}
      </body>
    </html>
  );
}
