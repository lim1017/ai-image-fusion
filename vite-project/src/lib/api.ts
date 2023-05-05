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

  console.log("before upload");

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
  } finally {
    console.log(" finally twilio text");
  }
};
