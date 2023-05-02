import Modal from "react-modal";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const customStyles = {
  content: {},
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const SimpleModal = ({ isOpen, closeModal, children }: ModalProps) => {
  return (
    <Modal
      style={customStyles}
      closeTimeoutMS={750}
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      {children}
    </Modal>
  );
};

export default SimpleModal;
