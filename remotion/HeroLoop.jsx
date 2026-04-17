import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 11.7) % 84),
  y: 12 + ((i * 17.3) % 70),
  size: 2 + (i % 4),
  drift: 40 + (i % 7) * 18
}));

export function HeroLoop() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = spring({
    frame,
    fps,
    damping: 140,
    stiffness: 90
  });

  const hueRotate = interpolate(frame % 260, [0, 260], [0, 36]);
  const lineX = interpolate(frame % 260, [0, 260], [-45, 120]);
  const ringScale = interpolate(frame % 200, [0, 200], [0.88, 1.12]);
  const cameraShift = interpolate(frame % 360, [0, 360], [-20, 20]);
  const orbY = interpolate(frame % 280, [0, 280], [88, -22]);
  const orbX = interpolate(frame % 300, [0, 300], [14, 82]);
  const earthRotation = interpolate(frame % 720, [0, 720], [0, 360]);
  const earthFloat = Math.sin(frame / 48) * 8;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 24%, rgba(38,108,255,.44), transparent 40%), radial-gradient(circle at 85% 22%, rgba(163,61,255,.44), transparent 38%), radial-gradient(circle at 35% 84%, rgba(44,186,255,.3), transparent 46%), #05060e",
        filter: `hue-rotate(${hueRotate}deg)`,
        overflow: "hidden"
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(81,111,205,.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(81,111,205,.16) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translate3d(${cameraShift}px, 0, 0) perspective(700px) rotateX(68deg) scale(1.5)`,
          transformOrigin: "center 90%",
          top: "46%",
          opacity: 0.52
        }}
      />

      <AbsoluteFill
        style={{
          left: `${orbX}%`,
          top: `${orbY}%`,
          width: 380,
          height: 380,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(117,255,249,.55) 0%, rgba(117,255,249,.16) 28%, transparent 72%)",
          filter: "blur(4px)",
          mixBlendMode: "screen"
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "6%",
          bottom: "9%",
          width: 270,
          height: 270,
          borderRadius: "50%",
          transform: `translateY(${earthFloat}px)`,
          background:
            "radial-gradient(circle at 30% 28%, rgba(186,245,255,.95) 0%, rgba(102,193,255,.82) 24%, rgba(25,115,201,.9) 58%, rgba(5,39,89,1) 100%)",
          boxShadow:
            "0 0 26px rgba(82, 209, 255, .5), inset -28px -34px 55px rgba(2, 16, 46, .85), inset 10px 8px 28px rgba(190, 247, 255, .22)",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            borderRadius: "50%",
            opacity: 0.72,
            background:
              "radial-gradient(ellipse at 22% 30%, rgba(84,214,137,.88) 0%, rgba(84,214,137,0) 24%), radial-gradient(ellipse at 54% 42%, rgba(126,224,145,.75) 0%, rgba(126,224,145,0) 21%), radial-gradient(ellipse at 72% 62%, rgba(93,208,130,.76) 0%, rgba(93,208,130,0) 23%), radial-gradient(ellipse at 36% 74%, rgba(70,197,118,.68) 0%, rgba(70,197,118,0) 19%)",
            transform: `rotate(${earthRotation}deg)`
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -12,
            borderRadius: "50%",
            border: "2px solid rgba(131, 232, 255, .58)",
            filter: "blur(0.2px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -30,
            right: -18,
            top: "20%",
            height: 48,
            borderRadius: 9999,
            borderTop: "2px solid rgba(140, 219, 255, .34)",
            borderBottom: "1px solid rgba(140, 219, 255, .14)",
            transform: `rotate(${-14 + Math.sin(frame / 60) * 2}deg)`,
            opacity: 0.8
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(116,181,255,.18) 45%, transparent 100%)",
          transform: `translateX(${lineX}%) skewX(-16deg)`,
          mixBlendMode: "screen"
        }}
      />

      <AbsoluteFill
        style={{
          inset: "10% 18%",
          borderRadius: 999,
          border: "1px solid rgba(111, 171, 255, 0.35)",
          transform: `scale(${ringScale})`,
          boxShadow: "0 0 80px rgba(92, 190, 255, 0.25)"
        }}
      />

      <AbsoluteFill
        style={{
          inset: "22% 26%",
          borderRadius: 999,
          border: "1px solid rgba(186, 110, 255, 0.45)",
          transform: `scale(${1.1 - pulse * 0.18})`
        }}
      />

      {particles.map((particle) => {
        const wobble = Math.sin((frame + particle.id * 21) / particle.drift);
        const yTravel = (frame * (0.2 + particle.id * 0.008)) % 120;
        return (
          <AbsoluteFill
            key={particle.id}
            style={{
              left: `${particle.x + wobble * 2}%`,
              top: `${(particle.y + yTravel) % 100}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: 9999,
              background: particle.id % 2 ? "rgba(118,220,255,.85)" : "rgba(193,123,255,.78)",
              boxShadow:
                particle.id % 2
                  ? "0 0 12px rgba(118,220,255,.95)"
                  : "0 0 12px rgba(193,123,255,.95)"
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.03) 0%, rgba(255,255,255,0) 4%, rgba(255,255,255,.03) 8%, rgba(255,255,255,0) 12%)",
          backgroundSize: "100% 24px",
          opacity: 0.24,
          mixBlendMode: "screen"
        }}
      />
    </AbsoluteFill>
  );
}
