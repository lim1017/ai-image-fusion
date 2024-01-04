import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import jwks from "jwks-rsa";
import * as jwt2 from "express-jwt";

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

// export const verifyAuth0Token = jwt2({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//   }),
//   audience: process.env.AUTH0_AUDIANCE,
//   issuer: "https://ai-images2.us.auth0.com/",
//   algorithms: ["RS256"],
// });
