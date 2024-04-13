import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import { getRandomPrompt, removeTextBeforeColon } from "../../../utils/helper";
import { SinglePost, postData } from "../../DisplayImages/lib/types";
import { createPost, getGptPrompt, requestGenerateImage } from "../lib/api";

export const useCreateImage = () => {
  const initialErrorObj = { name: false, prompt: false };

  const { user } = useAuth0();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        const photo = await requestGenerateImage(form.prompt);
        setForm({ ...form, photo });
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

  return {
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
  };
};
