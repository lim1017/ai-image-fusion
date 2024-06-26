import { rateLimit } from "express-rate-limit";
import { Logger } from "tslog";

export const customRateLimiter = (min, limit) => {
  const logger = new Logger({ name: "tom" });
  logger.silly("in custom limiter", min, limit);

  return rateLimit({
    windowMs: min * 60 * 1000,
    max: limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (request, response, next, options) => {
      console.log(request.rateLimit, "rate limit??");
      console.log(options, "optionsssss");
      if (request.rateLimit.used > request.rateLimit.limit) {
        // onLimitReached code here
        console.log("rate limit reached");
        response
          .status(429)
          .send("Rate limit reached! Please try again in one minute.");
      }
    },
  });
};
