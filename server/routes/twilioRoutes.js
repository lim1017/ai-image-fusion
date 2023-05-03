import express from "express";
import * as dotenv from "dotenv";

import twilio from "twilio";

dotenv.config();

const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

router.route("/send-text").post(async (req, res) => {
  try {
    const { name, msg, phone, img } = req.body;

    client.messages
      .create({
        body: `${msg} - Your Friend ${name}`,
        mediaUrl: [img],
        to: phone,
        from: "+12269185064",
      })
      .then((message) => console.log(message.sid, "sid"));

    res.status(201).json({ success: true, data: "message sent" });
  } catch (err) {
    res.status(500).json({ success: true, message: err });
  }
});

export default router;
