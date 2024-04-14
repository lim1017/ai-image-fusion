import { openai } from "../apis/openai.js";
import { queryIntentActions } from "./queryIntentActions.js";
import { IntentArray } from "./queryIntentActions.js";

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
  const stringIntents = JSON.stringify(IntentArray);
  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: `This query should be mapped to an intent for use to query a mongo database.  I want you to map the query to an intent from the following array of intents. 
      
      intents: ${stringIntents};
      
      If you cannot map the query to an intent, just return "unknown". 
      
      ***The Query***: "${query}"
      
      The purpose is the use the result to construct a query to the mongo database.

      return your response in a valid JSON format.
      {"intent": "get_posts", "email"?: "example@example.com", "user"?: "testUser", "date"?: "2022-01-01"}

      if the query references the themselves somehow weither its how many post I made, or what email did I use etc. Include the key "selfRef":"true" in the response.

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
  const { intent, date, selfRef, user, email, loggedInUser, loggedInEmail } =
    intentObj;

  const queryObj = {
    intent,
    date,
    //reassign user/email if selfRef
    user: selfRef ? loggedInUser : user,
    email: selfRef ? loggedInEmail : email,
  };

  if (!queryIntentActions[intent])
    return "Unknown query, check the Help menu or try using /gpt and ask about the db schemas";

  return await queryIntentActions[intent](queryObj);
};
