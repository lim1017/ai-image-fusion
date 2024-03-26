import { openai } from "../apis/openai.js";

export const generateImage = async (prompt) => {
  const aiRes = await openai.createImage({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const image = aiRes.data.data[0].b64_json;

  return image;
};
