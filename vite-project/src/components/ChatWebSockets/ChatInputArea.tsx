import { ChatCommands } from "../../hooks/useWebSocketChat";
import Button from "../Button";
import Input from "../Input";

interface ChatInputAreaProps {
  handleSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  command: string;
  setCommand: React.Dispatch<React.SetStateAction<"" | ChatCommands>>;
  isUserJoined: boolean;
  additionalText: string;
  newMessage: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const ChatInputArea = ({
  handleSendMessage,
  command,
  setCommand,
  isUserJoined,
  additionalText,
  newMessage,
  handleInputChange,
  handleKeyDown,
}: ChatInputAreaProps) => {
  return (
    <div className="p-4 border-t-2">
      <form onSubmit={handleSendMessage}>
        <div className="flex items-center  w-full p-2">
          {command && (
            <div className="chip bg-purple-500 text-white p-1 mr-2 rounded">
              {command}
              <span
                className="ml-2 cursor-pointer"
                onClick={() => setCommand("")}
              >
                &times;
              </span>
            </div>
          )}
          <Input
            disabled={!isUserJoined}
            type="text"
            value={command ? additionalText : newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1"
            placeholder={command ? "" : "Type your message..."}
          />
          <Button
            disabled={!isUserJoined}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
