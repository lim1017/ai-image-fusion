import express from "express";
import { ManagementClient } from "auth0";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

export const checkJwt = auth({
  audience: "ai-server",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

const checkScopes = requiredScopes("read:users");

// This route handles the authenticated request from the frontend
router.get("/", checkJwt, async (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");

  // const { authorization } = req.headers;
  // const accessToken = authorization.split(" ")[1];

  // const response = await axios.get(
  //   `https://${process.env.AUTH0_DOMAIN}/userinfo`,
  //   {
  //     headers: {
  //       authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );

  // console.log(accessToken, "ACCESSSSS TOKEN");
  // console.log(response.data, "RESPONSE DATA");

  // const auth0 = new ManagementClient({
  //   domain: process.env.AUTH0_DOMAIN,
  //   clientId: process.env.AUTH_CLIENT_ID,
  //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //   scope: "read:users",
  // });

  // auth0.getUsers((err, users) => {
  //   if (err) {
  //     console.error(err, "Error fetching users:");
  //     return res.status(500).json({ message: "Error fetching users." });
  //   }

  //   console.log(users.length);

  //   // Handle the users data here or send it as a response
  //   return res.status(200).json(users);
  // });
});

// router.get("/", checkJwt, async (req, res) => {
//   console.log("in authRoute post!!!!!!!!!!!");

//   const response = await axios.post(
//     `https://ai-images2.us.auth0.com/oauth/token`,
//     {
//       headers: { "Content-Type": "application/json" },
//       body: {
//         client_id: "ksSSi4UaOeZeAafITqGf8mOpdOBGv9Bp",
//         client_secret:
//           "uzekkSQ07L5OgvkVxM_PWp1WeIoy-djZ_qKfLC_XBpmDdfy4f_YrrBia2TwGoxGL",
//         audience: "https://ai-images2.us.auth0.com/api/v2/",
//         grant_type: "client_credentials",
//       },
//     }
//   );

//   console.log(response.data, "RESPONSE DATA");
// });

export default router;
