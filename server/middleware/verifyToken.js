import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    console.log(decoded, "DECODED INFO");
    // Attach payload to the req object for further use
    req.user = { decoded, token };
    next();
  });
};
