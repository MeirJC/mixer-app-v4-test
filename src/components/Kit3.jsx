import { useState, useEffect } from "react";
// import URL from "../samples/Hbas3.mp3";
// import URL2 from "../samples/Hgtr4.mp3";
import Loop from "./Loop";
function Kit2() {
  const sounds = {
    drums: [
      { src: "./samples/Hdrm1.mp3" },
      { src: "./samples/Hdrm2.mp3" },
      { src: "./samples/Hdrm3.mp3" },
      { src: "./samples/Hdrm4.mp3" },
    ],
  };
  // Context ↓
  const [ctx, setCtx] = useState(null);
  // const [anyActive, setAnyActive] = useState(false);
  // Open new AudioContext (must be by action cannot be on a page load)
  const setContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(audioContext);
    setCtx(audioContext);
  };

  //   //* The general flow:
  //   //* sourceNode (audioBuffer from audio) → gainNode → destination (the final output)

  return (
    <div className="App">
      <button onClick={setContext}>Set Audio Context</button>
      <Loop ctx={ctx} source={sounds.drums[0].src} />

      <br />
      {/* {sounds.drums.map((sound, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              const audio = new Audio(sound.src);
              audio.play();
            }}
          >
            {sound.src}
          </button>
        );
      })} */}
    </div>
  );
}

export default Kit2;

// const context = new AudioContext();
// const playButton = document.querySelector('#play');

// let yodelBuffer;

// window
//   .fetch(URL)
//   .then((response) => {
//     console.log(response);
//     return response.arrayBuffer();
//   })
//   .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
//   .then((audioBuffer) => {
//     playButton.disabled = false;
//     yodelBuffer = audioBuffer;
//   });

// playButton.onclick = () => play(yodelBuffer);

// function play(audioBuffer) {
//   const source = context.createBufferSource();
//   source.buffer = audioBuffer;
//   source.connect(context.destination);
//   source.start();
// }
