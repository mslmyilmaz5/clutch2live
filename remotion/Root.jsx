import React from "react";
import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";

export function RemotionRoot() {
  return (
    <Composition
      id="HeroLoop"
      component={HeroLoop}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
