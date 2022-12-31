import React, { useState, useRef, useLayoutEffect } from "react";
import { Howl } from "howler";

function Loop() {
  const [active, setActive] = useState(true);
  const source = "./samples/Hdrm1.mp3";

  const callMySound = (src, isActive) => {
    const sound = new Howl({
      src,
      html5: true,
      preload: true,
      loop: true,
      autoplay: true,
      mute: isActive,
      volume: 0.5,
    });

    console.log("sound.mute: ", sound.mute());
    setActive(!isActive);
    console.log("active", active);
  };

  return (
    <div>
      <h1>Loop</h1>
      <button onClick={() => callMySound(source, active)}>Play</button>
    </div>
  );
}

export default Loop;
