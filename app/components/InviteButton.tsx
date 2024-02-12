"use client";
import { useAcceptListInvite } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";

export function InviteAcceptButton(data: any) {
  const router = useRouter();
  const inviteData = data.data;

  const handleAcceptInvite = async (inviteId: any) => {
    const result = await useAcceptListInvite(inviteId);

    if (result.data) {
      router.push("/folder/shared/" + inviteData.data?.[0]?.listid);
    }
  };

  return (
    <button
      className="w-fit mx-auto px-4 py-2 text-center bg-white text-dark rounded-full hover:opacity-85 transition disabled:hover:opacity-70 disabled:opacity-70"
      onClick={() => handleAcceptInvite(inviteData.data?.[0]?.id)}
    >
      Accept
    </button>
  );
}

export function InviteDeclineButton() {
  const router = useRouter();

  return (
    <button
      className="w-fit mx-auto px-4 py-2 text-center border-secondary-bg border-[1px] border-solid text-white rounded-full hover:opacity-85 transition disabled:hover:opacity-70 disabled:opacity-70"
      onClick={() => router.push("/")}
    >
      Decline
    </button>
  );
}
