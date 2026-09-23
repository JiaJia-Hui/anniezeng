"use client";
import { useEffect, useRef, useState } from "react";

export default function RockScene() {
  const sceneRef   = useRef<HTMLDivElement>(null);
  const rotateRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered]   = useState(false);
  const [growth, setGrowth]     = useState({ moss: 0, mushroom: 0, flowerMain: 0, flowerUpper: 0, flowerLower: 0 });
  const growTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animRef    = useRef<number>(0);
  const targetRot  = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: -2, y: 0 });
  // wind sway
  const windRef    = useRef(0);

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

    const tick = (t: number) => {
      windRef.current = Math.sin(t / 2200) * 1.2;
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

  // hover → grow ecosystem
  useEffect(() => {
    growTimers.current.forEach(clearTimeout);
    growTimers.current = [];

    if (hovered) {
      const seq = [
        [0,    () => setGrowth(g => ({ ...g, moss: 1 }))],
        [500,  () => setGrowth(g => ({ ...g, mushroom: 1 }))],
        [900,  () => setGrowth(g => ({ ...g, flowerMain: 1 }))],
        [1200, () => setGrowth(g => ({ ...g, flowerUpper: 1 }))],
        [1450, () => setGrowth(g => ({ ...g, flowerLower: 1 }))],
      ] as [number, () => void][];
      seq.forEach(([delay, fn]) => {
        growTimers.current.push(setTimeout(fn, delay));
      });
    } else {
      const seq = [
        [0,   () => setGrowth(g => ({ ...g, flowerLower: 0, flowerUpper: 0 }))],
        [300, () => setGrowth(g => ({ ...g, flowerMain: 0 }))],
        [600, () => setGrowth(g => ({ ...g, mushroom: 0 }))],
        [900, () => setGrowth(g => ({ ...g, moss: 0 }))],
      ] as [number, () => void][];
      seq.forEach(([delay, fn]) => {
        growTimers.current.push(setTimeout(fn, delay));
      });
    }
  }, [hovered]);

  const dur = "1.4s";
  const ease = "cubic-bezier(.23,1,.32,1)";

  const layerBase: React.CSSProperties = {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      ref={sceneRef}
      style={{
        width: "100%", height: "100%",
        perspective: 1400,
        perspectiveOrigin: "50% 52%",
        cursor: "none",
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
          <img src="/anniezeng/assets/moss-grass-layer-real.png" alt="" style={{
            ...layerBase, zIndex: 2,
            opacity: growth.moss,
            transform: `translate3d(0, ${(1 - growth.moss) * 8}px, 1px) scale(${0.9 + growth.moss * 0.1})`,
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
          }} />

          {/* mushrooms */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/mushroom-layer-real.png" alt="" style={{
            ...layerBase, zIndex: 3,
            opacity: growth.mushroom,
            clipPath: `inset(${(1 - growth.mushroom) * 56}% 0 0)`,
            transform: `translate3d(0, ${(1 - growth.mushroom) * 22}px, 3px) scaleX(${0.78 + growth.mushroom * 0.22}) scaleY(${0.24 + growth.mushroom * 0.76})`,
            transformOrigin: "51% 63%",
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}, clip-path ${dur} ${ease}`,
          }} />

          {/* flowers main */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-main.png" alt="" style={{
            ...layerBase, zIndex: 4,
            opacity: growth.flowerMain,
            clipPath: `inset(${(1 - growth.flowerMain) * 45}% 0 0)`,
            transform: `translate3d(0, ${(1 - growth.flowerMain) * 18}px, 2px) scaleX(${0.82 + growth.flowerMain * 0.18}) scaleY(${0.16 + growth.flowerMain * 0.84})`,
            transformOrigin: "47.5% 59.5%",
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}, clip-path ${dur} ${ease}`,
          }} />

          {/* flowers upper */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-upper.png" alt="" style={{
            ...layerBase, zIndex: 5,
            opacity: growth.flowerUpper,
            clipPath: `inset(${(1 - growth.flowerUpper) * 50}% 0 0)`,
            transform: `translate3d(0, ${(1 - growth.flowerUpper) * 15}px, 3px) scaleX(${0.86 + growth.flowerUpper * 0.14}) scaleY(${0.2 + growth.flowerUpper * 0.8})`,
            transformOrigin: "60.5% 54%",
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}, clip-path ${dur} ${ease}`,
          }} />

          {/* flowers lower */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/anniezeng/assets/flower-cluster-lower.png" alt="" style={{
            ...layerBase, zIndex: 6,
            opacity: growth.flowerLower,
            clipPath: `inset(${(1 - growth.flowerLower) * 65}% 0 0)`,
            transform: `translate3d(0, ${(1 - growth.flowerLower) * 13}px, 4px) scaleX(${0.84 + growth.flowerLower * 0.16}) scaleY(${0.18 + growth.flowerLower * 0.82})`,
            transformOrigin: "63.5% 72.5%",
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}, clip-path ${dur} ${ease}`,
          }} />
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
