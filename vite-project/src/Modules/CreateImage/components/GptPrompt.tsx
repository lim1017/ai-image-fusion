import ChipInput from "./ChipInput";
import Card from "../../../components/Card";

type Props = {
  chips: string[];
  handleChipChange: (chips: string[]) => void;
  handleAskGpt: () => void;
  gptLoading: boolean;
};

export default function GptPrompt({
  chips,
  handleChipChange,
  handleAskGpt,
  gptLoading,
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
          gptLoading={gptLoading}
        />
      </Card>
    </div>
  );
}
