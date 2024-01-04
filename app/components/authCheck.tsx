"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";
import type { Database } from "@/lib/database.types";
import { useState, useEffect } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function AuthCheck({ children }: Props): JSX.Element {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (
          typeof window !== "undefined" &&
          pathname !== "/signin" &&
          pathname !== "/signup"
        ) {
          router.push("/signin");
        }
      } else {
        if ((session && pathname === "/signin") || pathname === "/signup") {
          router.push("/");
        }
      }
      setIsAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!isAuthChecked) {
    return <div>loading...</div>; // or a loading spinner
  }

  return <>{children}</>;
}
