import { useState, useRef } from "react";
import Button from "./Button";
import { uploadAudioFile } from "../lib/api";
import Timer from "./Timer";
import { useTimer } from "../hooks/useTimer";

const mimeType = "audio/webm";

//TODO check mic permissions not working as intended removed 4 now.
const AudioRecorder = ({
  retrieveWhipserText,
}: {
  retrieveWhipserText: (text: string) => void;
}) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  const { handleStartTimer, seconds } = useTimer();

  const getMicrophonePermission = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(streamData);
    setPermission(true);
  };

  const startRecording = async () => {
    if (stream) {
      //clear at bgn
      setAudioChunks([]);

      //start the recording
      setRecording(true);
      handleStartTimer();
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, { mimeType });
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current.start();
      const localAudioChunks: Blob[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    }
  };

  const stopRecording = () => {
    setRecording(false);

    if (mediaRecorder.current) {
      //stops the recording instance
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        //creates a playable URL from the blob file.
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };
    }
  };

  const handleUpload = async () => {
    if (audioUrl) {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const res = await uploadAudioFile(audioBlob);
      retrieveWhipserText(res.data);
    }
  };

  return (
    <div className="border-solid border-gray border-2 px-6 py-3 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none">
      {audioUrl ? (
        <div>
          <audio
            className="w-full flex flex-col items-center rounded-lg"
            controls
            src={audioUrl}
          />
          <Button className="mt-3 mr-3" type="button" onClick={handleUpload}>
            Upload
          </Button>

          <Button
            className="ml-3"
            intent="secondary"
            type="button"
            onClick={() => setAudioUrl(null)}
          >
            Retry
          </Button>
          {/* <a download href={audioUrl}>
            {" "}
            download{" "}
          </a> */}
        </div>
      ) : (
        <>
          {permission ? (
            <div>
              <h2 className="mb-4">
                Record an audio prompt for Whisper to transcribe to text
              </h2>

              <div>
                <Button
                  type="button"
                  intent="action"
                  className="mr-3"
                  onClick={startRecording}
                  disabled={recording}
                >
                  Record
                </Button>
                <Button
                  type="button"
                  intent="error"
                  className="ml-3"
                  onClick={stopRecording}
                  disabled={!recording}
                >
                  Stop Recording
                </Button>
              </div>
              <div>seconds:{seconds}</div>
            </div>
          ) : (
            <button type="button" onClick={getMicrophonePermission}>
              Get Microphone Permission
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
