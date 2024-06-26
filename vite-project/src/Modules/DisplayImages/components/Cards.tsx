import { Loader } from "../../../components";
import FavButton from "../../ShareImages/components/FavButton";
import Modal from "../../../components/Modal";
import ShareComponent from "../../ShareImages/components/ShareComponent";
import ShareForm from "../../ShareImages/components/ShareForm";
import { ShareOptionsComponent } from "../../ShareImages/components/ShareOptionsComponent";
import { useFavouriteImg } from "../../ShareImages/hooks/useFavouriteImg";
import { useModal } from "../../../hooks/useModal";
import {
  useShareMedia,
  ShareOptions,
} from "../../ShareImages/hooks/useShareMedia";
import { truncateString } from "../../../utils/helper";
import { SinglePost } from "../lib/types";
import { useEffect } from "react";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
  isAuthenticated: boolean;
}

const SinglePhotoCard = ({
  _id,
  name,
  prompt,
  photo,
  isAuthenticated,
}: CardProps) => {
  const { handleFavClick, isFavourite } = useFavouriteImg(_id);

  const { isOpen, openModal, closeModal } = useModal();

  const shareMedia = useShareMedia({ id: _id, photo, name });
  const {
    handleToggleShare,
    setEmailOrPhone,
    emailOrPhone,
    loading,
    handleSendText,
  } = shareMedia;

  useEffect(() => {
    setEmailOrPhone(undefined);
  }, [isOpen]);

  return (
    <div data-testid="single-card" className="card animate075 zoomIn relative">
      <div className="absolute top-10 left-10 z-50">
        <FavButton
          onClick={handleFavClick}
          selected={isFavourite}
          isAuthenticated={isAuthenticated}
        />
      </div>

      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover">
        <img
          onClick={openModal}
          className="w-full h-auto object-cover rounded-xl hover:cursor-pointer"
          src={photo}
          alt={prompt}
          tabIndex={0}
          role="button"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              openModal();
            }
          }}
        />

        <div
          style={{ width: "85%" }}
          className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 mx-auto  bg-[#10131f] m-2 p-4 rounded-md"
        >
          <h3 className="text-white text-sm overflow-y-auto h3rompt">
            {truncateString(prompt, 50)}
          </h3>

          <div className="mt-5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                {name[0]}
              </div>
              <p className="text-white text-sm">{truncateString(name, 10)}</p>
            </div>
            <ShareComponent
              id={_id}
              photo={photo}
              name={name}
              {...shareMedia}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {emailOrPhone ? (
          <ShareForm
            loading={loading}
            mode={emailOrPhone}
            photo={photo}
            executeAction={
              emailOrPhone === ShareOptions.TEXT
                ? handleSendText
                : handleSendText
            }
            closeModal={closeModal}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center px-8">
              <FavButton
                size={40}
                onClick={handleFavClick}
                selected={isFavourite}
                isAuthenticated={isAuthenticated}
              />

              <ShareOptionsComponent
                id={_id}
                setEmailOrPhone={setEmailOrPhone}
                handleToggleShare={handleToggleShare}
                photo={photo}
              />
            </div>
            <div>
              <img
                style={{ width: "75%", borderRadius: 50 }}
                className="mx-auto"
                src={photo}
                alt={prompt}
                onClick={() => closeModal()}
              />

              <h2 className="text-gray overflow-y-auto prompt text-center mt-6 text-[24px]">
                {prompt}
              </h2>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

interface RenderCardsProp {
  data: SinglePost[] | null;
  title: string;
  postsLoading: boolean;
  isAuthenticated: boolean;
}

export const RenderCards = ({
  data,
  title,
  postsLoading,
  isAuthenticated,
}: RenderCardsProp) => {
  if (data && data?.length > 0) {
    return (
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 gap-3">
        {data.map((post, i) => (
          <SinglePhotoCard
            key={i}
            {...post}
            isAuthenticated={isAuthenticated}
          />
        ))}
        {postsLoading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};
