import React from "react";
import Button from "../Button";

interface RandomPromptProps {
  handleRandomPrompt: () => void;
}

export default function RandomPrompt({
  handleRandomPrompt,
}: RandomPromptProps) {
  return (
    <div style={{ minHeight: 100 }}>
      <Button
        type="button"
        onClick={handleRandomPrompt}
        className="font-semibold text-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-black"
      >
        Get Random Prompt
      </Button>
    </div>
  );
}
