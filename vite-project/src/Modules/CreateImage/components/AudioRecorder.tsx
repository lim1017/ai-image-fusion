import { useState, useRef, useEffect } from "react";
import Button from "../../../components/Button";
import { useTimer } from "../../../hooks/useTimer";
import Card from "../../../components/Card";
import MuiLoader from "../../../components/MuiLoader";
import { uploadAudioFile } from "../lib/api";
const mimeType = "audio/webm";
const LoadingEnum = {
  idle: "idle",
  loading: "loading",
  success: "success",
};

type LoadingStatus = (typeof LoadingEnum)[keyof typeof LoadingEnum];

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

  const [isUploaded, setIsUploaded] = useState<LoadingStatus>(LoadingEnum.idle);

  const { handleStartTimer, seconds, handleResetTimer } = useTimer();

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
    handleResetTimer();
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
      setIsUploaded(LoadingEnum.loading);
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const res = await uploadAudioFile(audioBlob);
      retrieveWhipserText(res.data);
      setIsUploaded(LoadingEnum.success);
    }
  };

  const handleRetryAudioRecord = () => {
    setIsUploaded(LoadingEnum.idle);
    setAudioUrl(null);
  };

  //if seconds hit 30 seconds auto stop the recording
  useEffect(() => {
    if (seconds === "00:30") {
      stopRecording();
    }
  }, [seconds]);
  return (
    <Card>
      {audioUrl ? (
        <div>
          <audio
            className="w-full flex flex-col items-center rounded-lg"
            controls
            src={audioUrl}
          />
          <div className="mt-3 flex justify-center items-end">
            <Button
              className="mt-3 mr-3"
              type="button"
              disabled={
                isUploaded === LoadingEnum.loading ||
                isUploaded === LoadingEnum.success
              }
              onClick={handleUpload}
            >
              {isUploaded === LoadingEnum.loading ? (
                <div>
                  <MuiLoader />
                </div>
              ) : (
                "Upload"
              )}
            </Button>

            <Button
              className="ml-3"
              intent={
                isUploaded === LoadingEnum.success ? "primary" : "secondary"
              }
              type="button"
              onClick={handleRetryAudioRecord}
            >
              Retry
            </Button>
          </div>
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
                Record an audio prompt for Whisper to transcribe to text (30
                second limit)
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
              <div className="mt-3">{seconds}</div>
            </div>
          ) : (
            <button type="button" onClick={getMicrophonePermission}>
              Get Microphone Permission
            </button>
          )}
        </>
      )}
    </Card>
  );
};

export default AudioRecorder;
