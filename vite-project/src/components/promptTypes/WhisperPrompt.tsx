import AudioRecorder from "../AudioRecorder";

type Props = {
  retrieveWhipserText: (text: string) => void;
};

export default function WhisperPrompt({ retrieveWhipserText }: Props) {
  return (
    <div style={{ minHeight: 100 }}>
      <AudioRecorder retrieveWhipserText={retrieveWhipserText} />
    </div>
  );
}
