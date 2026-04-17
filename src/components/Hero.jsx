import { Player } from "@remotion/player";
import { Logo } from "./Logo";
import { HeroLoop } from "../../remotion/HeroLoop";

export function Hero() {
  return (
    <section className="hero section" data-section="hero">
      <div className="hero-media-wrap" aria-hidden>
        <div className="hero-fallback-bg" />
        <div className="hero-remotion">
          <Player
            component={HeroLoop}
            durationInFrames={240}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            autoPlay
            loop
            muted
            controls={false}
            clickToPlay={false}
            acknowledgeRemotionLicense
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-logo-anchor">
          <Logo />
        </div>
        <p className="kicker">Status: Always In Progress</p>
        <h1>Coming Soon</h1>
       {/*  <p className="lede">
          We are forging high-intensity game worlds where precision, timing, and
          impossible comebacks define every match.
        </p> */}
      </div>
    </section>
  );
}
