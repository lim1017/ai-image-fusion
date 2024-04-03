import { Message } from "../../hooks/useWebSocketChat";
import Button from "../Button";
import Loader from "../Loader";
import MuiLoader from "../MuiLoader";

interface MessageAreaProps {
  messageLog: Message[];
  chatUser: string;
  handleShare: (message: Message) => Promise<void>;
  sharedImagesArr: number[];
  submitPostLoading: boolean;
  gptLoading: boolean;
}

export const MessageArea = ({
  messageLog,
  chatUser,
  handleShare,
  sharedImagesArr,
  submitPostLoading,
  gptLoading,
}: MessageAreaProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messageLog.map((message, index) => {
        return (
          <div key={index} className="mb-4 text-left">
            {message.text && (
              <>
                <span className="font-bold">
                  {`${message.sender.toString().slice(0, 10)}`}:{" "}
                </span>
                <span className={message.isError ? "text-red-500" : ""}>
                  {message.command && (
                    <span className="chip bg-purple-500 text-white p-1 mr-2 rounded">
                      {" "}
                      /{message.command}{" "}
                    </span>
                  )}
                  {message.text}
                </span>
              </>
            )}
            {message.gpt && (
              <div className="flex">
                <p className="font-bold text-green-500 mr-2">AI: </p>{" "}
                {/* TODO get useTypingAnimation to work*/}
                <p>{message.gpt}</p>
              </div>
            )}
            {message.image && (
              <div>
                <img
                  className="w-1/2 mx-auto mt-2 mb-2"
                  src={`data:image/jpeg;base64,${message.image}`}
                  alt={message.text}
                />
                {message.sender === chatUser && (
                  <Button
                    onClick={() => handleShare(message)}
                    disabled={sharedImagesArr.includes(message.id)}
                    className="mt-1"
                  >
                    {submitPostLoading ? (
                      <MuiLoader />
                    ) : sharedImagesArr.includes(message.id) ? (
                      "Shared"
                    ) : (
                      "Share to Wall"
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
      {gptLoading ? (
        <div className="flex justify-center mt-2">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
