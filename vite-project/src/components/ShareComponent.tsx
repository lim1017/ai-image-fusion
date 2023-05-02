import React from "react";
import { shareIcon, closeIcon, download, textMsgIcon } from "../assets";
import { downloadImage } from "../utils/helper";
import { sendTwilioText } from "../lib/api";

const ShareComponent = ({ id, photo }: { id: string; photo: string }) => {
  const [showShareOptions, setShowShareOptions] = React.useState(false);

  const handleToggleShare = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handleSendText = async () => {
    console.log("send text");
    try {
      await sendTwilioText(14164538894, "Hello from Vite Project", photo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showShareOptions ? (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => downloadImage(id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>

          <img
            onClick={handleSendText}
            src={textMsgIcon}
            alt="logo"
            className="w-8 hover:cursor-pointer"
          />

          <img
            onClick={handleToggleShare}
            src={closeIcon}
            alt="logo"
            className="w-8 hover:cursor-pointer"
          />
        </div>
      ) : (
        <img
          onClick={handleToggleShare}
          src={shareIcon}
          alt="logo"
          className="w-8 hover:cursor-pointer"
        />
      )}
    </>
  );
};

export default ShareComponent;
