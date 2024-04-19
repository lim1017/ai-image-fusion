export const favouriteImage = async (id: string, token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/user/favourites`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId: id }),
    }
  );
  if (res.ok) {
    const result = await res.json();
    return result;
  } else {
    throw new Error("Something went wrong");
  }
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
