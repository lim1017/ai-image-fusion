import { preview } from "../../../assets";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { useModal } from "../../../hooks/useModal";
import FormField from "../../../components/FormField";
import Loader from "../../../components/Loader";
import TabComponent from "../../../components/TabComponent";
import RandomPrompt from "../components/RandomPrompt";
import GptPrompt from "../components/GptPrompt";
import WhisperPrompt from "../components/WhisperPrompt";
import MuiLoader from "../../../components/MuiLoader";
import AnimatedWrapper from "../../../components/Containers/AnimatedWrapper";
import { useCreateImage } from "../hooks/useCreateImage";

const CreatePost = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    generatingImg,
    gptLoading,
    generateImage,
    isLoading,
    handleSubmit,
    handleChange,
    handleSurpriseMe,
    handleChipChange,
    handleAskGpt,
    retrieveWhipserText,
    user,
    form,
    errors,
    chips,
  } = useCreateImage();

  return (
    <AnimatedWrapper>
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-center flex-col">
          <h1
            data-testid="create-post-title"
            className="font-extrabold text-[#666e75] text-[32px]"
          >
            Three exciting ways to generate an image... More to come!
          </h1>

          <h2 className="font-extrabold text-[#666a00] text-[18px]">
            Create an imaginative image through DALL-E AI and share it with the
            community
          </h2>
        </div>

        <form className="mt-16 m-w-3x1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Name*"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              handleChange={handleChange}
              error={errors.name}
              disabled={user?.nickname ? true : false}
              data-testid="create-post-name-input"
            />

            <TabComponent
              tabs={[
                {
                  name: "Basic",
                  content: (
                    <RandomPrompt handleRandomPrompt={handleSurpriseMe} />
                  ),
                },
                {
                  name: "chatGpt",
                  content: (
                    <GptPrompt
                      gptLoading={gptLoading}
                      chips={chips}
                      handleChipChange={handleChipChange}
                      handleAskGpt={handleAskGpt}
                    />
                  ),
                },
                {
                  name: "Whisper(Audio)",
                  content: (
                    <WhisperPrompt retrieveWhipserText={retrieveWhipserText} />
                  ),
                },
              ]}
            />

            <FormField
              labelName="Prompt*"
              type="text"
              name="prompt"
              placeholder="Prompt for AI to generate image"
              value={form.prompt}
              handleChange={handleChange}
              error={errors.prompt}
              data-testid="create-post-prompt-input"
            />

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form.photo ? (
                <img
                  onClick={openModal}
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain animate075 zoomIn"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-5">
            <Button
              disabled={generatingImg}
              type="button"
              intent="action"
              onClick={generateImage}
              data-testid="generate-img-btn"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </Button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <Button
              disabled={isLoading}
              type="submit"
              intent="primary"
              className="mt-3"
              data-testid="create-post-submit-btn"
            >
              {isLoading ? (
                <MuiLoader data-testid="generate-img-loader" />
              ) : (
                "Share with the Community"
              )}
            </Button>
          </div>
        </form>

        <Modal isOpen={isOpen} closeModal={closeModal}>
          <img
            style={{ width: "65%" }}
            className="mx-auto"
            src={form.photo}
            alt={form.prompt}
            onClick={() => closeModal()}
          />
        </Modal>
      </section>
    </AnimatedWrapper>
  );
};

export default CreatePost;
