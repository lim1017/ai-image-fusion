import { User } from "../WebSocketChat/hooks/useWebSocketChat";

interface SideBarProps {
  userList: User[];
  chatUser: string;
}

export const SideBar = ({ userList, chatUser }: SideBarProps) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="font-bold text-lg mb-4">Connected Users</h2>
      <ul>
        {userList.map((user) => (
          <li
            key={user.id}
            className={`mb-2 ${user.user === chatUser ? "text-red-500" : ""}`}
          >
            {user.user}
          </li>
        ))}
      </ul>
    </div>
  );
};
