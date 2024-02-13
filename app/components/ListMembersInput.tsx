"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDeleteListMember } from "@/lib/hooks/useSupabase";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface selectInputProps {
  listMembers: any[];
}

const ListMembersInput = ({ listMembers }: selectInputProps) => {
  const pathname = usePathname();
  const [hoveredUsername, setHoveredUsername] = useState("");

  const LogUserId = (member: any) => {
    useDeleteListMember(member.id, pathname.split("/")[3]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <p className="text-secondary-text">Members</p>
        {hoveredUsername && (
          <p className="mt-auto text-[14px]">({hoveredUsername})</p>
        )}
      </div>
      <div className="relative flex gap-2">
        {listMembers.map((member) => {
          const profileColors = member.profile_colors?.split("||") || [];
          const gradientColors = profileColors
            ? `linear-gradient(135deg, ${profileColors[0]}, ${profileColors[1]})`
            : "";

          return (
            <div
              key={member.id}
              className="w-10 h-10 rounded-full flex cursor-pointer hover:opacity-70 transition relative group"
              style={{ background: gradientColors }}
              onClick={() => LogUserId(member)}
              onMouseEnter={() => setHoveredUsername(member.username)}
              onMouseLeave={() => setHoveredUsername("")}
            >
              <p className="m-auto text-secondary-text group-hover:opacity-0">
                {member.username.charAt(0)}
              </p>
              <XMarkIcon className="absolute top-0 right-0 left-0 bottom-0 p-1 fill-secondary-text hidden opacity-80 group-hover:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMembersInput;
