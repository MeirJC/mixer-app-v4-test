import { useState, useEffect, useRef } from "react";
import URL from "../samples/Hbas3.mp3";
import URL2 from "../samples/Hgtr4.mp3";

function Kit() {
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
  // Source 1 ↓
  const [loop1, setLoop1] = useState(null);
  // Gain 1 ↓
  const [gain1, setGain1] = useState(null);
  // Source 2 ↓
  const [loop2, setLoop2] = useState(null);
  // Gain 2 ↓
  const [gain2, setGain2] = useState(null);
  // Source 3 ↓
  const [loop3, setLoop3] = useState(null);
  // Gain 3 ↓
  const [gain3, setGain3] = useState(null);
  // Source 4 ↓
  const [loop4, setLoop4] = useState(null);
  // Gain 4 ↓
  const [gain4, setGain4] = useState(null);

  // Open new AudioContext (must be by action cannot be on a page load)
  const setContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(
      "window.AudioContext: ",
      window.AudioContext,
      "window.webkitAudioContext: ",
      window.webkitAudioContext
    );
    // console.log(audioContext);
    setCtx(audioContext);
  };

  // Load Sources of audio and save them to state, then create gain node or any other middleware,
  // then connect all the destination (main output)
  const load = async () => {
    //? fetch song from url or physical audio
    const res = await fetch(URL);
    //? convert audio to arrayBuffer
    const arrayBuffer = await res.arrayBuffer();
    //? convert arrayBuffer to audioBuffer
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    //? create new buffer source Node
    const source1 = ctx.createBufferSource();
    //? connect the audio buffer that we created before to the source node
    source1.buffer = audioBuffer;
    //? set the source node to loop
    source1.loop = true;
    //? set the source node to state
    setLoop1(source1);

    //? create new gain node
    const gain = await ctx.createGain();
    //? set the gain node to state
    setGain1(gain);
    //? connect the gain node to the final destination
    gain.connect(ctx.destination);
    //? connect the gain node to the gain node
    source1.connect(gain);

    //* The general flow:
    //* sourceNode (audioBuffer from audio) → gainNode → destination (the final output)

    // duplicate No 2
    //? fetch song from url or physical audio
    const res2 = await fetch(URL2);
    //? convert audio to arrayBuffer
    const arrayBuffer2 = await res2.arrayBuffer();
    //? convert arrayBuffer to audioBuffer
    const audioBuffer2 = await ctx.decodeAudioData(arrayBuffer2);
    //? create new buffer source Node
    const source2 = ctx.createBufferSource();
    //? connect the audio buffer that we created before to the source node
    source2.buffer = audioBuffer2;
    //? set the source node to loop
    source2.loop = true;
    //? set the source node to state
    setLoop2(source2);

    //? connect the gain node to the final destination
    source2.connect(ctx.destination);
  };
  const play = async () => {
    // start source 1
    loop1.start();
    // start source 2
    loop2.start();
  };
  const openGainForSource = () => {
    // manipulate gain (the middle node)
    if (gain1.gain.value === 0) {
      gain1.gain.value = 1;
    } else {
      gain1.gain.value = 0;
    }
  };
  return (
    <div className="App">
      <button onClick={setContext}>Set Audio Context</button>
      <button onClick={load}>load</button>
      <button onClick={play}>play</button>
      <button onClick={openGainForSource}>Open Gain For Source</button>
      <br />
      {sounds.drums.map((sound, index) => {
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
      })}
    </div>
  );
}

export default Kit;

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
