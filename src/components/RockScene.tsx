"use client";
import { useEffect, useRef, useState } from "react";

export default function RockScene() {
  const sceneRef   = useRef<HTMLDivElement>(null);
  const rotateRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const animRef    = useRef<number>(0);
  const targetRot  = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: -2, y: 0 });

  // mouse → 3d tilt
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      targetRot.current = {
        x: -((e.clientY - cy) / rect.height) * 18,
        y:  ((e.clientX - cx) / rect.width)  * 18,
      };
    };
    const onLeave = () => { targetRot.current = { x: -2, y: 0 }; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const r = currentRot.current;
      const tr = targetRot.current;
      r.x += (tr.x - r.x) * 0.06;
      r.y += (tr.y - r.y) * 0.06;
      if (rotateRef.current) {
        rotateRef.current.style.transform =
          `rotateX(${r.x}deg) rotateY(${r.y}deg) rotateZ(-1deg)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const dur = "0.6s";
  const ease = "cubic-bezier(.23,1,.32,1)";

  const layerBase: React.CSSProperties = {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
  };

  const growLayer = (opacity: number, zIndex: number): React.CSSProperties => ({
    ...layerBase, zIndex,
    opacity,
    transition: `opacity ${dur} ${ease}`,
  });

  return (
    <div
      ref={sceneRef}
      style={{
        width: "100%", height: "100%",
        perspective: 1400,
        perspectiveOrigin: "50% 52%",
        cursor: "none",
        pointerEvents: "auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* floating animation wrapper */}
      <div style={{
        position: "absolute", inset: 0,
        animation: "rock-float 7.2s ease-in-out infinite",
        transformStyle: "preserve-3d",
      }}>
        {/* rotation wrapper */}
        <div
          ref={rotateRef}
          style={{
            position: "absolute", inset: 0,
            transformStyle: "preserve-3d",
            transformOrigin: "50% 52%",
            transition: "transform .05s linear",
          }}
        >
          {/* base rock */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/rock-base-without-flowers.png" alt="" style={{ ...layerBase, zIndex: 1 }} />

          {/* moss */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/moss-grass-layer-real.png" alt="" style={growLayer(hovered ? 1 : 0, 2)} />

          {/* mushrooms */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/mushroom-layer-real.png" alt="" style={growLayer(hovered ? 1 : 0, 3)} />

          {/* flowers main */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-main.png" alt="" style={growLayer(hovered ? 1 : 0, 4)} />

          {/* flowers upper */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-upper.png" alt="" style={growLayer(hovered ? 1 : 0, 5)} />

          {/* flowers lower */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-lower.png" alt="" style={growLayer(hovered ? 1 : 0, 6)} />
        </div>
      </div>

      {/* shadow */}
      <div style={{
        position: "absolute", left: "50%", top: "89%",
        width: "28%", height: "5.5%", borderRadius: "50%",
        background: "rgba(39,35,28,.18)",
        filter: "blur(20px)",
        transform: "translateX(-50%)",
        animation: "rock-shadow 7.2s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes rock-float {
          0%, 100% { transform: translate3d(0, -6px, 0); }
          50%       { transform: translate3d(0,  6px, 0); }
        }
        @keyframes rock-shadow {
          0%, 100% { transform: translateX(-50%) scale(.88); opacity: .24; }
          50%       { transform: translateX(-50%) scale(1.04); opacity: .38; }
        }
      `}</style>
    </div>
  );
}
