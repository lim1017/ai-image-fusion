import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { viewportWidth } from "../constants";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: viewportWidth > 1800 ? "55%" : viewportWidth > 1500 ? "65%" : "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SimpleModal = ({ isOpen, closeModal, children }: ModalProps) => {
  console.log(viewportWidth);
  return (
    <div className="animate075 zoomIn">
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade timeout={{ enter: 1000, exit: 500 }} in={isOpen}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SimpleModal;
