import jwt from "jsonwebtoken";

import { auth } from "express-oauth2-jwt-bearer";

export const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    // Attach payload to the req object for further use
    req.user = { data, token };
    next();
  });
};

export const auth0JwtCheck = auth({
  audience: "ai-server",
  issuerBaseURL: "https://ai-images2.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
