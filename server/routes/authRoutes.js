import express from "express";
import { ManagementClient } from "auth0";
import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: "ai-server",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

const checkScopes = requiredScopes("read:users");

// This route handles the authenticated request from the frontend
router.post("/", checkJwt, checkScopes, async (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");

  const auth0 = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: "read:users",
  });

  auth0.getUsers((err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error fetching users." });
    }

    console.log(users.length);

    // Handle the users data here or send it as a response
    return res.status(200).json(users);
  });
});

export default router;
