import { truncateString } from "../utils/helper";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import ShareComponent from "./ShareComponent";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}

const SinglePhotoCard = ({ _id, name, prompt, photo }: CardProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="card">
      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover">
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
          <p className="text-white text-sm overflow-y-auto prompt">
            {truncateString(prompt, 50)}
          </p>

          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {name[0]}
              </div>
              <p className="text-white text-sm">{truncateString(name, 10)}</p>
            </div>
            <ShareComponent id={_id} photo={photo} name={name} />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div>
          <img
            style={{ width: "65%" }}
            className="mx-auto"
            src={photo}
            alt={prompt}
            onClick={() => closeModal()}
          />

          <h2 className="text-gray text-sm overflow-y-auto prompt text-center mt-6">
            {prompt}
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default SinglePhotoCard;
