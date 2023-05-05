import React from "react";
import AudioRecorder from "../AudioRecorder";
import DragDropFileUploader from "../DragDropFileUploader";

type Props = {
  handleUpload: (file: File) => void;
};

export default function WhisperPrompt({ handleUpload }: Props) {
  return (
    <div style={{ minHeight: 100 }}>
      {" "}
      <AudioRecorder />
      <DragDropFileUploader handleUpload={handleUpload} />
    </div>
  );
}
