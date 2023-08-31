import React from "react";
import { shareIcon, closeIcon, textMsgIcon } from "../assets";
import { BiDownload } from "react-icons/bi";

import { downloadImage } from "../utils/helper";
import { sendTwilioText } from "../lib/api";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import ShareForm from "./ShareForm";
import { Tooltip } from "@mui/material";

export enum ShareOptions {
  TEXT = "text",
  EMAIL = "email",
}

const ShareComponent = ({
  id,
  photo,
  name,
}: {
  id: string;
  photo: string;
  name: string;
}) => {
  const [showShareOptions, setShowShareOptions] = React.useState(false);

  const { isOpen, openModal, closeModal } = useModal();

  const [emailOrPhone, setEmailOrPhone] = React.useState<
    ShareOptions | undefined
  >(undefined);

  const [loading, setLoading] = React.useState(false);

  const handleToggleShare = () => {
    setShowShareOptions((prev) => !prev);
  };

  const handleSendText = async ({
    mobile,
    message,
  }: {
    mobile: string;
    message: string;
  }) => {
    //mobile is to number so if letters = NaN
    if (!Number(mobile)) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      setTimeout(async () => {
        await sendTwilioText(mobile, message, photo, name);
      }, 1000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div>
      {showShareOptions ? (
        <div className="flex gap-4">
          <Tooltip title="Download">
            <button
              type="button"
              onClick={() => downloadImage(id, photo)}
              className="outline-none bg-transparent border-none"
            >
              {/* <img
                src={download}
                alt="download"
                className="w-4 h-4 object-contain invert"
              /> */}
              <BiDownload
                className="inline-block mr-2"
                color="white"
                size={20}
              />
            </button>
          </Tooltip>
          <Tooltip title="Send Text">
            <img
              onClick={() => {
                openModal();
                setEmailOrPhone(ShareOptions.TEXT);
              }}
              src={textMsgIcon}
              alt="logo"
              className="w-5 hover:cursor-pointer"
            />
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

          <Tooltip title="Cancel">
            <img
              onClick={handleToggleShare}
              src={closeIcon}
              alt="logo"
              className="w-5 hover:cursor-pointer"
            />
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Share">
          <img
            onClick={handleToggleShare}
            src={shareIcon}
            alt="logo"
            className="w-5 hover:cursor-pointer"
          />
        </Tooltip>
      )}

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ShareForm
          loading={loading}
          mode={emailOrPhone}
          photo={photo}
          executeAction={
            emailOrPhone === ShareOptions.TEXT ? handleSendText : handleSendText
          }
          closeModal={closeModal}
        />

        {/* {emailOrPhone === ShareOptions.EMAIL ? (
          <div>enter email</div>
        ) : (
          <>
            <div>center phone text</div>
            <button onClick={handleSendText}>Send Text</button>
          </>
        )} */}
      </Modal>
    </div>
  );
};

export default ShareComponent;
