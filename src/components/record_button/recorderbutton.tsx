import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/web";
import { transform } from "typescript";

const queryForDevices = async () => {
  //Query for device available
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      return new MediaRecorder(stream); //If the function success return the MediaRecorder
    } else {
      console.log("No support");
    }
  } catch (err) {
    console.log(err);
  }
};

export default function RecorderButton() {
  const [audioChunks, setAudioChunks] = useState<Blob>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [audioState, setAudioState] = useState<"inactive" | "recording">(
    "inactive"
  );

  const recorder = useRef<MediaRecorder>();

  const handleStopRecording = (e: BlobEvent) => {
    //This Eevent Handler gets called when the Audio data will be available
    setAudioChunks(e.data);
    setAudioUrl(window.URL.createObjectURL(e.data));
  };

  const sendData = () => {
    if (audioChunks) {
      const formData = new FormData();
      formData.append("recorded", audioChunks, "data.mp3");
      fetch("http://192.168.1.174:3300", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }).then((dataResp) => console.log(dataResp));
    }
  };

  const startRecording = async () => {
    try {
      const stream = await queryForDevices();
      recorder.current = stream;
      if (!recorder.current) return;
      recorder.current.addEventListener("dataavailable", handleStopRecording);
      recorder.current.state === "inactive" && recorder.current.start();
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecording = () => {
    if (recorder.current) {
      recorder.current.stop();
    }
  };

  useEffect(() => {
    return () => {
      recorder.current &&
        recorder.current.removeEventListener(
          "dataavailable",
          handleStopRecording
        );
    };
  }, []);

  return (
    <React.StrictMode>
      <div>
        <div>Recorder</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            className="record-button"
            onClick={() => startRecording()}
          ></button>
          <button className="p-4" onClick={() => stopRecording()}>
            Stop
          </button>
          {audioUrl && <audio src={audioUrl} controls></audio>}
        </div>
      </div>
    </React.StrictMode>
  );
}

// const [bouncingValue, api] = useSpring(() => ({
//   transform: "scale(1)",
//   config: config.gentle,
// }));

// api.start({
//   from: { transform: "scale(1)" },
//   to: [
//     {
//       transform: "scale(1.5)",
//     },
//     {
//       transform: "scale(1)",
//     },
//   ],

// loop: true,
// });
