declare module "../utils/helper" {
  export function truncateString(str: string, num: number): string;
  export function downloadImage(url: string, filename: string): Promise<void>;
  export function getRandomPrompt(prompt: string): string;
}
