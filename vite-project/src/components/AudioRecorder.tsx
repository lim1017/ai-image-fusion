import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { uploadAudioFile } from "../lib/api";
import { checkNavigatorMic } from "../utils/helper";

const mimeType = "audio/webm";

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

  console.log({ permission });
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  const getMicrophonePermission = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(streamData);
    setPermission(true);
  };

  const startRecording = async () => {
    //clear at bgn
    setAudioChunks([]);

    //start the recording
    setRecording(true);
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

  useEffect(() => {
    checkNavigatorMic().then((res) => setPermission(res));
  }, []);

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
            <>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={startRecording}
                disabled={recording}
              >
                Record
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={stopRecording}
                disabled={!recording}
              >
                Stop Recording
              </button>
            </>
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
