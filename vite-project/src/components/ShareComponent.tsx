import React from "react";
import { shareIcon } from "../assets";
import Modal from "./Modal";
import ShareForm from "./ShareForm";
import { Tooltip } from "@mui/material";
import { ShareOptionsComponent } from "./ShareOptionsComponent";
import { ShareOptions } from "../hooks/useShareMedia";

interface ShareComponentProps {
  id: string;
  photo: string;
  name: string;
  showShareOptions: boolean;
  handleToggleShare: () => void;
  handleSendText: ({
    mobile,
    message,
  }: {
    mobile: string;
    message: string;
  }) => Promise<void>;
  loading: boolean;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  emailOrPhone: ShareOptions | undefined;
  setEmailOrPhone: React.Dispatch<
    React.SetStateAction<ShareOptions | undefined>
  >;
}

const ShareComponent = ({
  id,
  photo,
  name,
  showShareOptions,
  handleToggleShare,
  handleSendText,
  loading,
  isOpen,
  openModal,
  closeModal,
  emailOrPhone,
  setEmailOrPhone,
}: ShareComponentProps) => {
  return (
    <div>
      {showShareOptions ? (
        <ShareOptionsComponent
          id={id}
          openModal={openModal}
          setEmailOrPhone={setEmailOrPhone}
          handleToggleShare={handleToggleShare}
          photo={photo}
        />
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
