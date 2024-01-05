import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/database.types";
import NavigationBar from "./components/NavigationBar";

export default async function App() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("user_profiles")
    .select("username")
    .eq("id", session?.user?.id ?? "");

  return (
    <main className="h-full w-full">
      <NavigationBar userid={session?.user?.id}></NavigationBar>
      <pre>
        {JSON.stringify(data, null, 2)}
        <form action="/auth/sign-out" method="post">
          <button>Logout</button>
        </form>
      </pre>
    </main>
  );
}
