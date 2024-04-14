import { sendTwilioText } from "../lib/api";
import { useModal } from "../../../hooks/useModal";
import { useState } from "react";

export enum ShareOptions {
  TEXT = "text",
  EMAIL = "email",
}

interface useShareMediaProps {
  id: string;
  photo: string;
  name: string;
}

export const useShareMedia = ({ id, photo, name }: useShareMediaProps) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const [emailOrPhone, setEmailOrPhone] = useState<ShareOptions | undefined>(
    undefined
  );

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
        console.log("after twilio send");
      }, 1000);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("in finally of text");
      setLoading(false);
      closeModal();
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return {
    showShareOptions,
    setShowShareOptions,
    handleToggleShare,
    handleSendText,
    loading,
    isOpen,
    openModal,
    closeModal: handleCloseModal,
    emailOrPhone,
    setEmailOrPhone,
  };
};
