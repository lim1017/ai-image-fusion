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

export const getIntentNLP = async (query) => {
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: `This query should be mapped to an intent for use to query a mongo database.  I want you to map the query to a clear intent such as "count_posts", "get_email", "count_favourites" etc.  If you cannot map the query to an intent, just return "unknown". Query: "${query}"
      
      Also construct a query for the mongo database. 

      Schemas:
      const Post = new mongoose.Schema({
        name: { type: String, required: true },
        prompt: { type: String, required: true },
        photo: { type: String, required: true },
        email: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
      });
      const User = new mongoose.Schema({
        name: { type: String, required: true },
        // email: { type: String, required: true, unique: true },
        email: {
          type: String,
          validate: {
            validator: async function (email) {
              const user = await this.constructor.findOne({ email });
              if (user) {
                if (this.id === user.id) {
                  return true;
                }
                return false;
              }
              return true;
            },
            message: (props) => "The specified email address is already in use.",
          },
          required: [true, "User email required"],
        },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        favourites: { type: Array, required: false },
      });

      return your response in the following format
      {intent: "get_posts", query: "User.findOne().where("email", "example@example.com")}
      `,
      max_tokens: 50,
      temperature: 0,
    });

    const intentText = response.data.choices[0].text.trim();
    console.log(intentText, "gpt intent");

    // Add other intent mappings as needed
    return { intent: intentText };
  } catch (error) {
    console.error("Error in getNlpIntent:", error);
    throw error;
  }
};
