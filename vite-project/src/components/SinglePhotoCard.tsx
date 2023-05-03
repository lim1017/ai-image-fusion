// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import { truncateString } from "../utils/helper";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import ShareComponent from "./ShareComponent";
import { Tooltip } from "@mui/material";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const SinglePhotoCard = ({ _id, name, prompt, photo }: CardProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
        <img
          onClick={openModal}
          className="w-full h-auto object-cover rounded-xl hover:cursor-pointer"
          src={photo}
          alt={prompt}
        />

        <div
          style={{ width: "85%" }}
          className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 mx-auto  bg-[#10131f] m-2 p-4 rounded-md"
        >
          {/* TODO Tooltip messes with the hover a bit */}
          {/* <Tooltip title={prompt}> */}
          <p className="text-white text-sm overflow-y-auto prompt">
            {truncateString(prompt, 50)}
          </p>
          {/* </Tooltip> */}

          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {name[0]}
              </div>
              <p className="text-white text-sm">{truncateString(name, 15)}</p>
            </div>
            <ShareComponent id={_id} photo={photo} name={name} />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <img
          style={{ width: "65%" }}
          className="mx-auto"
          src={photo}
          alt={prompt}
          onClick={() => closeModal()}
        />
      </Modal>
    </>
  );
};

export default SinglePhotoCard;
