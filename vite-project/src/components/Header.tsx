import { logo } from "../assets";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import SimpleModal from "./Modal";
import { useModal } from "../hooks/useModal";
import PaypalBtn from "./PaypalBtn";

export default function Header() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <div className="flex items-center">
          <Link to="/" className="mr-2">
            <img src={logo} alt="logo" className="w-28 object-contain" />
          </Link>
          <Button className="ml-2" intent="action" onClick={openModal}>
            About
          </Button>
          <PaypalBtn />
        </div>

        <Link to="/create-post">
          <Button intent="primary">Create</Button>
        </Link>
      </header>
      <SimpleModal isOpen={isOpen} closeModal={closeModal}>
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">About</h1>
            <p className="mt-2 text-[#666e75] text-[14px]">
              MERN stack app with Vite, Tailwind, & Typescript. Utilizing
              openAI's GPT-3, Whisper, & Dall-e to create some fun content.
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
            <ul style={{ listStyleType: "disc", padding: 20 }}>
              <li className="mt-4">OpenAI's API</li>
              <li className="mt-4">Twilio API</li>
              <li className="mt-4">Upload/Storage/Serving Images</li>
              <li className="mt-4">Audio recording/upload</li>
              <li className="mt-4">Pagination</li>
              <li className="mt-4">Prompt Engineering</li>
              <li className="mt-4">React Query</li>
            </ul>
          </div>
        </div>
      </SimpleModal>
    </>
  );
}
