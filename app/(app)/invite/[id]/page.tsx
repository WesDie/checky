import { useGetInviteData } from "@/lib/hooks/useSupabase";
import {
  InviteAcceptButton,
  InviteDeclineButton,
} from "@/app/components/InviteButton";

export default async function App({ params }: { params: { id: string } }) {
  const data = await useGetInviteData(params.id);

  return (
    <div className="max-w-[400px] flex flex-col gap-4 m-auto text-center">
      <div className="w-fit mx-auto flex gap-4 border-[1px] border-solid border-primary-bg rounded px-4 py-2">
        <div className="w-12 h-12 bg-secondary-bg rounded-full flex">
          <p className="m-auto">{data.listData?.[0]?.icon}</p>
        </div>
        <h1 className="text-2xl font-semibold my-auto">
          {data.listData?.[0]?.title}
        </h1>
      </div>
      <p className="m-auto opacity-50">
        You have been invited by {data.userData?.[0]?.username}
      </p>
      <div className="flex gap-2 w-fit mx-auto">
        <InviteAcceptButton data={data}></InviteAcceptButton>
        <InviteDeclineButton></InviteDeclineButton>
      </div>
    </div>
  );
}
