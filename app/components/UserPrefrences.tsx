"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";

type Props = {
  userData: any;
  children: React.ReactNode;
};

export default function UserPrefrences({ userData, children }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/signin");
      }
    };
    checkSession();
  }, []);

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

      document.body.classList.add(`${userData[0]?.theme || "dark"}`);
      document.body.classList.add(
        `highlight-${userData[0]?.highlight_colors || "blue"}`
      );
    }
  }, [userData]);

  if (isLoading) {
    return null;
  }

  return <main className={`bg-dark text-white h-full`}>{children}</main>;
}
