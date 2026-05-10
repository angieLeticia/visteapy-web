"use client";
import { useState } from "react";

interface Props {
  before: string;
  after: string;
  containerHeight?: number;
}

export default function BeforeAfterSlider({ before, after, containerHeight = 520 }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        borderRadius: 16,
        overflow: "hidden",
        height: containerHeight,
        background: "#F5EDE0",
        touchAction: "none",
      }}
    >
      {/* After image — full width, sits behind */}
      <img
        src={after}
        alt="Resultado IA"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
        draggable={false}
      />

      {/* Before image — clipped to left side */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: "clip-path 0ms",
        }}
      >
        <img
          src={before}
          alt="Tu foto original"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          transform: "translateX(-50%)",
          width: 2,
          background: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }}
      >
        {/* Handle circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 2px 16px rgba(0,0,0,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#1C1C1A",
            fontWeight: 300,
          }}
        >
          ⇔
        </div>
      </div>

      {/* Labels */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          background: "rgba(28,28,26,0.68)",
          color: "white",
          padding: "5px 14px",
          borderRadius: 100,
          fontSize: 10,
          letterSpacing: "0.18em",
          fontFamily: "var(--font-inter)",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        Antes
      </div>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "rgba(28,28,26,0.68)",
          color: "white",
          padding: "5px 14px",
          borderRadius: 100,
          fontSize: 10,
          letterSpacing: "0.18em",
          fontFamily: "var(--font-inter)",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        Después
      </div>

      {/* Transparent range input covering entire area */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          cursor: "ew-resize",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          WebkitAppearance: "none",
        }}
      />
    </div>
  );
}
