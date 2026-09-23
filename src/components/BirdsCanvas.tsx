"use client";
import { useEffect, useRef } from "react";

type Bird = {
  tPath: number; speed: number;
  p0: { x: number; y: number }; p1: { x: number; y: number };
  p2: { x: number; y: number }; p3: { x: number; y: number };
  wingPhase: number; wingSpeed: number;
  scale: number; opacity: number;
};

function bezier(t: number, p0: {x:number;y:number}, p1: {x:number;y:number}, p2: {x:number;y:number}, p3: {x:number;y:number}) {
  const u = 1 - t, tt = t * t, uu = u * u, uuu = uu * u, ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
  };
}

export default function BirdsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const flock: Bird[] = [];

    const drawBird = (x: number, y: number, scale: number, wingPhase: number, alpha: number) => {
      const w = 18 * scale;
      const wh = 5 * scale * Math.abs(Math.sin(wingPhase));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "rgba(55,48,38,0.78)";
      ctx.lineWidth = 1.1 * scale;
      ctx.lineCap = "round";
      ctx.filter = `blur(${(1 - scale) * 1.2}px)`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x - w * 0.5, y - wh, x - w, y - wh * 0.4);
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + w * 0.5, y - wh, x + w, y - wh * 0.4);
      ctx.stroke();
      ctx.restore();
    };

    const spawnFlock = () => {
      const count = 3 + Math.floor(Math.random() * 4);
      const fromLeft = Math.random() > 0.5;
      const yBase = window.innerHeight * (0.14 + Math.random() * 0.18);
      const x0 = fromLeft ? -60 : window.innerWidth + 60;
      const x3 = fromLeft ? window.innerWidth + 60 : -60;
      const cp1 = { x: fromLeft ? window.innerWidth * 0.28 : window.innerWidth * 0.72, y: yBase - window.innerHeight * 0.03 };
      const cp2 = { x: fromLeft ? window.innerWidth * 0.62 : window.innerWidth * 0.38, y: yBase + window.innerHeight * 0.02 };
      const speed = 0.00022 + Math.random() * 0.00014;
      for (let i = 0; i < count; i++) {
        flock.push({
          tPath: 0,
          speed: speed * (0.82 + Math.random() * 0.36),
          p0: { x: x0, y: yBase + (Math.random() - 0.5) * 26 },
          p1: cp1, p2: cp2,
          p3: { x: x3, y: yBase + (Math.random() - 0.5) * 26 },
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.055 + Math.random() * 0.055,
          scale: 0.26 + Math.random() * 0.22,
          opacity: 0.18 + Math.random() * 0.18,
        });
      }
    };

    let lastFlockTime = 0;
    let nextFlockDelay = 4000 + Math.random() * 3000;
    let raf: number;

    const animate = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (ts - lastFlockTime > nextFlockDelay) {
        spawnFlock();
        lastFlockTime = ts;
        nextFlockDelay = 9000 + Math.random() * 9000;
      }
      for (let i = flock.length - 1; i >= 0; i--) {
        const b = flock[i];
        b.tPath += b.speed * 16;
        b.wingPhase += b.wingSpeed;
        if (b.tPath >= 1) { flock.splice(i, 1); continue; }
        const pos = bezier(b.tPath, b.p0, b.p1, b.p2, b.p3);
        const ef = Math.min(
          Math.min(pos.x / (window.innerWidth * 0.08), 1),
          Math.min((window.innerWidth - pos.x) / (window.innerWidth * 0.08), 1)
        );
        drawBird(pos.x, pos.y, b.scale, b.wingPhase, b.opacity * ef);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
