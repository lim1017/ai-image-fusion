import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt, removeTextBeforeColon } from "../utils/helper";
import { FormField, Loader } from "../components";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { getGptPrompt } from "../lib/api";
import ChipInput from "../components/ChipInput";

const Page2 = () => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chips, setChips] = useState<string[]>([]);

  const generateImage = async () => {
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

        const data = await res.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.photo && form.prompt) {
      setLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            photo: form.photo,
          }),
        });

        await res.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleAskGpt = () => {
    getGptPrompt(chips)
      .then((res) => {
        setForm({ ...form, prompt: removeTextBeforeColon(res.trim()) });
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 m-w-3x1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />

          <ChipInput
            chips={chips}
            labelName="GPT Prompt"
            name="gptPrompt"
            placeholder="AI will generate a prompt for based on your keywords (5 max)"
            handleChange={handleChipChange}
            handleBtnClick={handleAskGpt}
          />

          <FormField
            labelName="Manual Prompt"
            type="text"
            name="prompt"
            placeholder="A asian dragon flying over a city"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                onClick={openModal}
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
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
          <Button type="button" intent="action" onClick={generateImage}>
            {generatingImg ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <Button type="submit" intent="primary" className="mt-3 ">
            {loading ? "Sharing..." : "Share with the Community"}
          </Button>
        </div>
      </form>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <img
          style={{ width: "65%" }}
          className="mx-auto"
          src={form.photo}
          alt={prompt}
          onClick={() => closeModal()}
        />
      </Modal>
    </section>
  );
};

export default Page2;
