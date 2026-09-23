"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; r: number; col: [number, number, number];
};

export default function PollenCanvas({ proximityRef }: { proximityRef: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let prevMX = window.innerWidth / 2, prevMY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      const spd = Math.hypot(e.clientX - prevMX, e.clientY - prevMY);
      if (proximityRef.current > 0.12 && spd > 4) {
        const count = Math.min(3, 1 + Math.floor(spd / 22));
        for (let i = 0; i < count; i++) {
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -0.18 - Math.random() * 0.28,
            life: 0,
            max: 40 + Math.random() * 30,
            r: 0.6 + Math.random() * 1.8,
            col: Math.random() > 0.5 ? [218, 195, 115] : [235, 222, 185],
          });
        }
      }
      prevMX = e.clientX; prevMY = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.life * 0.18) * 0.22;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.max) { particles.splice(i, 1); continue; }
        const lt = p.life / p.max;
        const a = (lt < 0.18 ? lt / 0.18 : lt > 0.78 ? (1 - lt) / 0.22 : 1) * 0.52;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [proximityRef]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
