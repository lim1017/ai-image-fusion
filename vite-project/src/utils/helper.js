import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export const getRandomPrompt = (prompt) => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //checks if the new random prompt is the same as the current one
  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  } else return randomPrompt;
};

export const downloadImage = async (imgId, photo) => {
  FileSaver.saveAs(photo, `download-${imgId}.jpg`);
};

export const truncateString = (str, length) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};
