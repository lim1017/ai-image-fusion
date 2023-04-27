import Modal from "react-modal";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const SimpleModal = ({ isOpen, closeModal, children }: ModalProps) => {
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
