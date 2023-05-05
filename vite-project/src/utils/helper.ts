import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

interface Obj {
  [key: string]: boolean;
}

export const checkNavigatorMic = async () => {
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      return false;
    }
  } else {
    // Chrome + others
    try {
      const permissionStatus = await navigator.permissions.query({
        //ts-expect-error - typescript doesn't know about the microphone permission
        name: "microphone",
      });
      console.log(permissionStatus);
      if (permissionStatus.state === "granted") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

export const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //checks if the new random prompt is the same as the current one
  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  } else return randomPrompt;
};

export const downloadImage = async (imgId: string, photo: string) => {
  FileSaver.saveAs(photo, `download-${imgId}.jpg`);
};

export const truncateString = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

export const removeTextBeforeColon = (text: string) => {
  const colonIndex = text.indexOf(":");
  if (colonIndex === -1) {
    // If there's no colon in the text, return it as-is
    return text;
  }
  // Return the substring starting from the character after the colon
  return text.substring(colonIndex + 1).trim();
};

export const checkForError = (errorObj: Obj) => {
  for (const key in errorObj) {
    if (errorObj[key]) {
      return true;
    }
  }
  return false;
};
