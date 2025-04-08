import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import useWorkspaceId from "../../../hooks/useWorkspaceId";
import axios from "axios";
import { getAvatarColor, getAvatarFallbackText } from "../../../lib/helper";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();
  const [members, setMembers] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;

    const fetchMembers = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workspace/${workspaceId}/members`
        );
        setMembers(response.data.members || []);
      } catch (err) {
        console.log("Error fetching members:", err);
      }
      setIsPending(false);
    };

    fetchMembers();
  }, [workspaceId]);

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader className="w-8 h-8 animate-spin place-self-center flex" />
      ) : null}
      {members.length === 0 && !isPending && (
        <div className="font-semibold text-sm text-muted-foreground text-center py-5">
          No Members yet
        </div>
      )}

      <ul role="list" className="space-y-3">
        {members.map((member) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={member._id || member.userId._id} // Adjust based on your API response
              role="listitem"
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarImage
                    src={member.userId.profilePicture || ""}
                    alt="Avatar"
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">
                  {member.userId.name}
                </p>
                <p className="text-sm text-gray-500">{member.role.name}</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                <p>Joined</p>
                <p>{member.joinedAt ? format(member.joinedAt, "PPP") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;