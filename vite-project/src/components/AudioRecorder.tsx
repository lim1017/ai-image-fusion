import React, { useState, useEffect, useRef } from "react";

const mimeType = "audio/webm";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  const getMicrophonePermission = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(streamData);
    setPermission(true);
  };

  const startRecording = async () => {
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
        setAudioChunks([]);
      };
    }
  };

  return (
    <div className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full focus:border-violet-500 focus:outline-none">
      {audioUrl ? (
        <audio
          className="w-full flex flex-col items-center"
          controls
          src={audioUrl}
        />
      ) : (
        <>
          {permission ? (
            <>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={startRecording}
                disabled={recording}
              >
                Record
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={stopRecording}
                disabled={!recording}
              >
                Stop Recording
              </button>
            </>
          ) : (
            <button onClick={getMicrophonePermission}>get permission</button>
          )}
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
