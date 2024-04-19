import { postData } from "../../DisplayImages/lib/types";

export const requestGenerateImage = async (prompt: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dalle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  //checks for rate limit error
  if (!res.ok) {
    const errorText = await res.text(); // Get the error text
    throw new Error(errorText); // Optionally, you can throw an error to handle it further
  }

  const data = await res.json();
  return `data:image/jpeg;base64,${data.photo}`;
};

export const createPost = async (data: postData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const result = await res.json();
      return result;
    } else {
      throw new Error("Something went wrong with create post request");
    }
  } catch (e) {
    console.log(e, "create post error");
  }
};

export const getGptPrompt = async (chips: string[]) => {
  const prompt = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chips }),
  });

  return prompt.json();
};

export const uploadAudioFile = async (file: File | Blob) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/whisper/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
};
