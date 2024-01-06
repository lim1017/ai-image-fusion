import Button from "../Button";
import Card from "../Card";

interface RandomPromptProps {
  handleRandomPrompt: () => void;
}

export default function RandomPrompt({
  handleRandomPrompt,
}: RandomPromptProps) {
  return (
    <div style={{ minHeight: 160 }} className="pt-4">
      <Card>
        <p className="mb-4 pt-4"> "Comeup with your own prompt, or..."</p>
        <Button
          type="button"
          onClick={handleRandomPrompt}
          className="font-semibold text-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-black mt-2"
        >
          Get Random Prompt
        </Button>
      </Card>
    </div>
  );
}
