import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt, removeTextBeforeColon } from "../utils/helper";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { createPost, getGptPrompt } from "../lib/api";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import TabComponent from "../components/TabComponent";
import RandomPrompt from "../components/promptTypes/RandomPrompt";
import GptPrompt from "../components/promptTypes/GptPrompt";
import WhisperPrompt from "../components/promptTypes/WhisperPrompt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SinglePost, postData } from "../lib/types";
import MuiLoader from "../components/MuiLoader";
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedWrapper from "../components/Containers/AnimatedWrapper";

const initialErrorObj = { name: false, prompt: false };

const CreatePage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    name: user?.nickname || "",
    prompt: "",
    photo: "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState(initialErrorObj);

  const [generatingImg, setGeneratingImg] = useState(false);

  const [gptLoading, setGptLoading] = useState(false);

  const [chips, setChips] = useState<string[]>([]);

  const generateImage = async () => {
    if (!form.prompt.trim()) {
      setErrors((prev) => {
        return { ...prev, prompt: true };
      });
      return;
    }

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/dalle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        //checks for rate limit error
        if (!res.ok) {
          const errorText = await res.text(); // Get the error text
          throw new Error(errorText); // Optionally, you can throw an error to handle it further
        }

        const data = await res.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setChips([]);
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const { mutate, isLoading } = useMutation<SinglePost, unknown, postData>(
    (newData: postData) => createPost(newData),
    {
      onSuccess: () => {
        //@ts-expect-error passing in an array does not work
        queryClient.invalidateQueries("posts");
      },
      onSettled: () => {
        navigate("/");
      },
      onError(error) {
        alert(error);
      },
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setErrors((prev) => {
        return { ...prev, name: true };
      });
      return;
    }

    if (form.photo && form.prompt) {
      mutate({
        name: form.name,
        prompt: form.prompt,
        photo: form.photo,
        email: form.email,
      });
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSurpriseMe = () => {
    const randomPromp = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPromp });
  };

  const handleChipChange = (chips: string[]) => {
    if (chips.length <= 5) {
      setChips(chips);
    }
  };

  const handleAskGpt = async () => {
    try {
      setGptLoading(true);

      const res = await getGptPrompt(chips);

      setForm({ ...form, prompt: removeTextBeforeColon(res.trim()) });
    } catch (err) {
      alert(err);
    } finally {
      setGptLoading(false);
    }
  };

  const retrieveWhipserText = async (text: string) => {
    setForm({ ...form, prompt: text });
  };

  useEffect(() => {
    if (form.prompt) {
      setErrors((prev) => {
        return { ...prev, prompt: false };
      });
    }
  }, [form.prompt]);
  return (
    <AnimatedWrapper>
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-center flex-col">
          <h1 className="font-extrabold text-[#666e75] text-[32px]">
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
              className=""
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
              className="mt-3 "
            >
              {isLoading ? <MuiLoader /> : "Share with the Community"}
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

export default CreatePage;
