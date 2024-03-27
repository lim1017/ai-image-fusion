import { openai } from "../apis/openai.js";
import User from "../mongodb/models/user.js";
import Post from "../mongodb/models/post.js";

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
      prompt: `This query should be mapped to an intent for use to query a mongo database.  I want you to map the query to an intent from the following array of intents. 
      
      intents: [
        'count_users',
        'count_posts',
        'posts_by_userX',
        'user_by_email',
        'users_after_date',
        'posts_sorted_by_date',
        'count_posts_by_user',
      ];
      
      If you cannot map the query to an intent, just return "unknown". 
      
      ***The Query***: "${query}"
      
      The purpose is the use the result to construct a query to the mongo database.

      return your response in a valid JSON format.
      {"intent": "get_posts", "email"?: "example@example.com", "user"?: "testUser", "date"?: "2022-01-01"}

      if the query references the user themselves include "user" in the response as "selfReferenceUser123"

      Where the key "intent" is required mapped intent, and the rest are optional depending on if they are needed to produce a query.
      `,
      max_tokens: 50,
      temperature: 0,
    });

    const intentText = response.data.choices[0].text.trim();

    return intentText;
  } catch (error) {
    console.error("Error in getNlpIntent:", error);
    throw error;
  }
};

export const queryMongoWithIntent = async (intentObj) => {
  const { intent, email, user, date } = intentObj;
  console.log(intentObj, "intentObj");
  console.log(intent, "intent!!!");
  switch (intent) {
    case "count_users":
      return await User.countDocuments();

    case "count_posts":
      return await Post.countDocuments();

    case "posts_by_userX":
      if (!user) throw new Error("User name is required for this intent.");
      return await Post.find({ name: user });

    case "user_by_email":
      if (!email) throw new Error("Email is required for this intent.");
      return await User.findOne({ email });

    case "users_after_date":
      if (!date) throw new Error("Date is required for this intent.");
      return await User.find({ createdAt: { $gt: new Date(date) } });

    case "posts_sorted_by_date":
      return await Post.find().sort({ createdAt: -1 });

    case "count_posts_by_user":
      if (!user) throw new Error("User name is required for this intent.");
      return await Post.countDocuments({ name: user });

    default:
      return "Unknown query, try asking /gpt about the db schemas";
  }
};
