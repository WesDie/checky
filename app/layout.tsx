import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Modal from "./components/Modal";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checky",
  description: "a list app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        {children}
        <Modal></Modal>
      </body>
    </html>
  );
}
