import React from "react";
import ChipInput from "../ChipInput";
import Card from "../Card";

type Props = {
  chips: string[];
  handleChipChange: (chips: string[]) => void;
  handleAskGpt: () => void;
};

export default function GptPrompt({
  chips,
  handleChipChange,
  handleAskGpt,
}: Props) {
  return (
    <div style={{ minHeight: 160 }}>
      <Card>
        <ChipInput
          chips={chips}
          labelName="Keywords for AI Prompt"
          name="gptPrompt"
          placeholder="Enter up to 5 keywords and ask Gpt to generate a prompt"
          handleChange={handleChipChange}
          handleBtnClick={handleAskGpt}
        />
      </Card>
    </div>
  );
}
