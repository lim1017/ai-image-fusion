import React from "react";
import { ChatCommands } from "../../hooks/useWebSocketChat";
import Button from "../Button";
import TextArea from "../TextArea";

interface ChatInputAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  handleSendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
  command: string;
  setCommand: React.Dispatch<React.SetStateAction<"" | ChatCommands>>;
  isUserJoined: boolean;
  additionalText: string;
  newMessage: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  hideButton?: boolean;
}

export const ChatInputArea = React.forwardRef<
  HTMLTextAreaElement,
  ChatInputAreaProps
>(
  (
    {
      handleSendMessage,
      command,
      setCommand,
      isUserJoined,
      additionalText,
      newMessage,
      handleInputChange,
      handleKeyDown,
      hideButton,
    },
    ref
  ) => {
    return (
      <div className="p-1 border-t-2">
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
            <TextArea
              ref={ref}
              disabled={!isUserJoined}
              type="text"
              value={command ? additionalText : newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1"
              placeholder={command ? "" : "Type your message..."}
            />
            {!hideButton ? (
              <Button
                disabled={!isUserJoined}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
);
