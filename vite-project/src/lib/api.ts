export const initalGptPrompt = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/api/v1/gpt/initial`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
