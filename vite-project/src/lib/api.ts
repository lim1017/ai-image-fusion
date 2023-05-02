export const sendTwilioText = async (phone, msg, img) => {
  if (!phone) {
    alert("please enter phone #");
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/twilio/send-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, msg, img }),
      }
    );
    console.log(res, " res of twilio text");
  } finally {
    console.log(" finally twilio text");
  }
};
