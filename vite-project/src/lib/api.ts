import { postData } from "./types";

export const favouriteImage = async (id: string, token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/user/favourites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: id, email: "lim1017@gmail.com" }),
    }
  );
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
};

export const createPost = async (data: postData) => {
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
    throw new Error("Something went wrong");
  }
};

export const fetchPosts = async ({
  pageParam = 1,
  pageSize = 8,
  userEmail = "",
}) => {
  let url = `${import.meta.env.VITE_API_URL}/api/v1/post`;

  if (userEmail) {
    url += `?userEmail=${userEmail}&page=${pageParam}&limit=${pageSize}`;
  } else {
    url += `?page=${pageParam}&limit=${pageSize}`;
  }
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
};

export const initalGptPrompt = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/api/v1/gpt/initial`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export const getWhisperTranscript = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/whisper/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
  return data;
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

export const sendTwilioText = async (
  phone: string,
  msg: string,
  img: string,
  name: string
) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/twilio/send-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, msg, img, name }),
      }
    );
    console.log(res, " res of twilio text");
  } catch (err) {
    console.log(err);
  }
};
