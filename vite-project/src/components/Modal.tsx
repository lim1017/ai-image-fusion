import Modal from "react-modal";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const SimpleModal = ({ isOpen, closeModal, children }) => {
  return (
    <Modal
      closeTimeoutMS={750}
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
      className="w-3/4 bg-white rounded-xl p-8"
    >
      {children}
    </Modal>
  );
};

export default SimpleModal;
