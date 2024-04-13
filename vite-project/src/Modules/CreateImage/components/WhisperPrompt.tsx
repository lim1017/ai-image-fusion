import AudioRecorder from "../../../components/AudioRecorder";

type Props = {
  retrieveWhipserText: (text: string) => void;
};

export default function WhisperPrompt({ retrieveWhipserText }: Props) {
  return (
    <div
      style={{
        minHeight: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AudioRecorder retrieveWhipserText={retrieveWhipserText} />
    </div>
  );
}
