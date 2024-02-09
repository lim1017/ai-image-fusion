import { rateLimit } from "express-rate-limit";

export const customRateLimiter = (min, limit) => {
  console.log("in custom limiter", min, limit);
  return rateLimit({
    windowMs: min * 60 * 1000,
    max: limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
};
