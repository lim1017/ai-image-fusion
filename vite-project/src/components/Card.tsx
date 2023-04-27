import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils/helper";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import "./Modal.css";
import { CSSTransition } from "react-transition-group";

const Card = ({ _id, name, prompt, photo }) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        onClick={openModal}
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div
        style={{ width: "85%" }}
        className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 mx-auto  bg-[#10131f] m-2 p-4 rounded-md"
      >
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
      <CSSTransition in={isOpen} timeout={1500} classNames="fade" unmountOnExit>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <img
            style={{ width: "65%" }}
            className="mx-auto"
            src={photo}
            alt={prompt}
          />
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Card;
