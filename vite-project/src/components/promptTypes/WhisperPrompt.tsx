import AudioRecorder from "../AudioRecorder";
import Button from "../Button";

type Props = {
  handleUpload: (file: File) => void;
};

export default function WhisperPrompt({ handleUpload }: Props) {
  const handleFileUpload = (file: File) => {
    handleUpload(file);
  };

  return (
    <div style={{ minHeight: 100 }}>
      <AudioRecorder handleUpload={handleUpload} />
    </div>
  );
}
