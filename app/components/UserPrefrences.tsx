"use client";
import { use, useEffect, useState } from "react";

type Props = {
  userData: any;
  children: React.ReactNode; // Added children prop
};

export default function UserPrefrences({ userData, children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const clearBodyClasses = () => {
    const bodyClasses = document.body.classList;
    while (bodyClasses.length > 1) {
      bodyClasses.remove(bodyClasses[1]);
    }
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      clearBodyClasses();

      document.body.classList.add(`${userData[0].theme}`);
      document.body.classList.add(`highlight-${userData[0].highlight_colors}`);
    }
  }, [userData]);

  if (isLoading) {
    return null;
  }

  return <main className={`bg-dark text-white h-full`}>{children}</main>;
}
