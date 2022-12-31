import React, { useEffect, useState } from "react";

function Loop({ ctx, source }) {
  const [loop, setLoop] = useState(null);
  const [gain, setGain] = useState(null);
  const [loopActive, setLoopActive] = useState(false);
  // console.log("ctx: ", ctx, "source: ", source);

  const load = async () => {
    //? fetch song from url or physical audio
    const res = await fetch(source);
    //? convert audio to arrayBuffer
    const arrayBuffer = await res.arrayBuffer();
    //? convert arrayBuffer to audioBuffer
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    //? create new buffer source Node
    const loopFile = ctx.createBufferSource();
    //? connect the audio buffer that we created before to the source node
    loopFile.buffer = audioBuffer;
    //? set the source node to loop
    loopFile.loop = true;
    //? set the source node to state
    setLoop(loopFile);
    //? create new gain node
    const gain = await ctx.createGain();
    //? set the gain node to state
    setGain(gain);
    //? connect the gain node to the final destination
    gain.connect(ctx.destination);
    //? connect the gain node to the gain node
    loopFile.connect(gain);
  };
  useEffect(() => {
    load();
  }, [ctx, source]);

  const play = async () => {
    loop.start();
  };
  const stop = async () => {
    loop.stop();
  };
  const gainSwitch = () => {
    if (gain.gain.value === 0) {
      gain.gain.value = 1;
    } else {
      gain.gain.value = 0;
    }
  };
  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={stop}>stop</button>
      <button onClick={gainSwitch}>gainSwitch</button>
    </div>
  );
}

export default Loop;
