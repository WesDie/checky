"use client";

interface selectInputProps {
  listMembers: any[];
}

const ListMembersInput = ({ listMembers }: selectInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className=" text-secondary-text">Members</p>
      <div className="relative flex gap-2">
        {listMembers.map((member) => {
          const profileColors = member.profile_colors?.split("||") || [];
          const gradientColors = profileColors
            ? `linear-gradient(135deg, ${profileColors[0]}, ${profileColors[1]})`
            : "";

          return (
            <div
              key={member.id}
              className="w-10 h-10 rounded-full flex cursor-pointer hover:opacity-80 transition"
              style={{ background: gradientColors }}
            >
              <p className="m-auto opacity-100 text-secondary-text">
                {member.username.charAt(0)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMembersInput;
