import React from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillChatTextFill } from "react-icons/bs";
import { closeIcon } from "../../../assets";
import { downloadImage } from "../../../utils/helper";
import { Tooltip } from "@mui/material";
import { ShareOptions } from "../hooks/useShareMedia";

type Props = {
  setEmailOrPhone: React.Dispatch<
    React.SetStateAction<ShareOptions | undefined>
  >;
  id: string;
  photo: string;
  openModal?: () => void; //If undefined, already in a modal
  handleToggleShare: () => void;
};

export const ShareOptionsComponent = ({
  id,
  openModal,
  setEmailOrPhone,
  handleToggleShare,
  photo,
}: Props) => {
  const containerStyle = openModal
    ? "flex gap-4"
    : "mr-8 p-3 mb-4 border-4 border-gray rounded-md  flex gap-4";

  return (
    <div className={containerStyle}>
      <Tooltip title="Download">
        <button
          type="button"
          onClick={() => downloadImage(id, photo)}
          className="outline-none bg-transparent border-none"
        >
          <BiDownload
            className="inline-block mr-2"
            color={!openModal ? "black" : "white"}
            size={20}
          />
        </button>
      </Tooltip>
      {/* TODO twilio account disabled atm */}
      <Tooltip title="Send Text">
        <button
          type="button"
          onClick={() =>
            alert("Twilio account issues, I've probably run out of 💰💰")
          }
          className="outline-none bg-transparent border-none"
        >
          <BsFillChatTextFill
            className="inline-block mr-2 w-5"
            color={!openModal ? "black" : "white"}
            size={25}
          />
        </button>
      </Tooltip>

      {/*TODO no email yet */}
      {/* <img
            onClick={() => {
              openModal();
              setEmailOrPhone(ShareOptions.EMAIL);
            }}
            src={emailIcon}
            alt="logo"
            className="w-8 hover:cursor-pointer"
          /> */}

      {!openModal ? null : (
        <Tooltip title="Cancel">
          <img
            onClick={handleToggleShare}
            src={closeIcon}
            alt="logo"
            className="w-5 hover:cursor-pointer"
          />
        </Tooltip>
      )}
    </div>
  );
};
