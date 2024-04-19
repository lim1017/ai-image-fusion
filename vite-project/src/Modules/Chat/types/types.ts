export interface Message {
  text: string;
  sender: string;
  id: number;
  time: string;
  room: string;
  command: string;
  image?: string;
  imagePrompt?: string;
  gpt?: string;
  email?: string;
  isError?: boolean;
}

export interface Users {
  [key: string]: User;
}

export interface User {
  id: number;
  user: string;
}

export const enum ChatCommands {
  IMAGE = "image",
  GPT = "gpt",
  QUERY = "query",
}
