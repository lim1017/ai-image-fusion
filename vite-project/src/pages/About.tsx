import { ReactElement, useState, lazy, Suspense } from "react";
import SimpleModal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { wait } from "../utils/helper";
import { Loader } from "../components";
import ReactQueryContent from "../components/ModalComponents/ReactQueryContent";
import AnimatedWrapper from "../components/Containers/AnimatedWrapper";
import RouteGuardConent from "../components/ModalComponents/RouteGuardConent";

const LazyModalContent = lazy(() =>
  wait(1000).then(
    () => import("../components/ModalComponents/LazyModalContent")
  )
);

const About = () => {
  const [modalContent, setModalContent] = useState<ReactElement | undefined>();
  const { openModal, isOpen, closeModal } = useModal();

  const handleModalClick = (content: ReactElement) => {
    setModalContent(content);
    openModal();
  };

  return (
    <AnimatedWrapper>
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">About</h1>
          <p className="mt-2 text-[#666e75] text-[14px]">
            MERN stack app with Vite, Tailwind, & Typescript. Utilizing openAI's
            GPT-3, Whisper, & Dall-e to create some fun content.
          </p>
          <h3 className="mt-3">
            Extended from JavaScript Mastery tutorial:{" "}
            <a
              className="text-[#148cf5] text-[16px]"
              href="https://www.youtube.com/watch?v=EyIvuigqDoA"
              target="_blank"
            >
              Link
            </a>
          </h3>
        </div>
        <div className="mt-4">
          <h2 className="text-[32px] font-bold">Learning Outcomes</h2>
          <ul
            className="ul-about"
            style={{ listStyleType: "disc", padding: 20 }}
          >
            <li className="mt-4 li-about">OpenAI API</li>
            <li className="mt-4 li-about">Twilio API</li>
            <li className="mt-4 li-about">Upload/Storage/Serving Images</li>
            <li className="mt-4 li-about">Audio recording/upload</li>
            <li className="mt-4 li-about">Pagination</li>
            <li className="mt-4 li-about">Prompt Engineering</li>
            <li
              className="mt-4 li-about text-blue-500 cursor-pointer hover:underline"
              onClick={() => handleModalClick(<ReactQueryContent />)}
            >
              React Query
            </li>
            <li className="mt-4 li-about">CSS Animations/Transitions</li>
            <li className="mt-4 li-about">
              Responsive Design & Web Accessibility
            </li>
            <li
              onClick={() => handleModalClick(<RouteGuardConent />)}
              className="mt-4 li-about text-blue-500 cursor-pointer hover:underline"
            >
              Route Guarding
            </li>
            <li
              onClick={() => handleModalClick(<LazyModalContent />)}
              className="mt-4 li-about text-blue-500 cursor-pointer hover:underline"
            >
              Code Splitting /w lazy/Suspense
            </li>
          </ul>
        </div>

        <SimpleModal isOpen={isOpen} closeModal={closeModal}>
          <Suspense
            fallback={
              <div className="flex justify-center pt-4 mt-4">
                <Loader />
              </div>
            }
          >
            {modalContent}
          </Suspense>
        </SimpleModal>
      </div>
    </AnimatedWrapper>
  );
};

export default About;
