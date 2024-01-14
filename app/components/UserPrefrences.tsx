"use client";
import { useEffect } from "react";

type Props = {
  userData: any;
};

export default function UserPrefrences({ userData }: Props) {
  useEffect(() => {
    if (userData) {
      document.documentElement.style.setProperty(
        "--highlight-color",
        userData[0].highlight_colors
      );
    }
  }, [userData]);

  return null;
}
