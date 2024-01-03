import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthCheck from "@/app/components/authCheck";

import type { Database } from "@/lib/database.types";

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
    <AuthCheck>
      <pre>
        {JSON.stringify(data, null, 2)}
        <form action="/auth/sign-out" method="post">
          <button>Logout</button>
        </form>
      </pre>
    </AuthCheck>
  );
}
