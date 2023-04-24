import { surpriseMePrompts } from "../constants";

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //checks if the new random prompt is the same as the current one
  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  } else return randomPrompt;
};
