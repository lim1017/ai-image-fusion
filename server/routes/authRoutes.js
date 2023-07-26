import express from "express";

import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
const router = express.Router();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
  audience: "ai-server",
  issuerBaseURL: `https://ai-images2.us.auth0.com/`,
});

// This route handles the authenticated request from the frontend
router.post("/", checkJwt, async (req, res) => {
  console.log("in authRoute post!!!!!!!!!!!");
});

export default router;
