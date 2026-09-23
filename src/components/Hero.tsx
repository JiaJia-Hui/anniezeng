"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const BirdsCanvas  = dynamic(() => import("./BirdsCanvas"),  { ssr: false });
const PollenCanvas = dynamic(() => import("./PollenCanvas"), { ssr: false });
const RockScene    = dynamic(() => import("./RockScene"),    { ssr: false });

const ROCK_CX = 0.70, ROCK_CY = 0.50, ROCK_RX = 0.20, ROCK_RY = 0.44;

export default function Hero() {
  const bgImgRef     = useRef<HTMLImageElement>(null);
  const warmRef      = useRef<HTMLDivElement>(null);
  const proximity    = useRef(0);
  const fadeRefs     = useRef<(HTMLElement | null)[]>([]);

  // entrance sequence
  useEffect(() => {
    const delays = [380, 560, 720, 870, 1060, 1220, 1400];
    const timers = fadeRefs.current.map((el, i) =>
      el ? setTimeout(() => el.classList.add("in"), delays[i] ?? i * 150) : null
    );
    return () => timers.forEach(t => t && clearTimeout(t));
  }, []);

  // background parallax + rock-proximity warm glow
  useEffect(() => {
    let bgTX = 0, bgTY = 0, curBgTX = 0, curBgTY = 0;
    let proxTarget = 0, proxCurrent = 0;

    const onMove = (e: MouseEvent) => {
      bgTX = (e.clientX / window.innerWidth  - 0.5) * -6;
      bgTY = (e.clientY / window.innerHeight - 0.5) * -4;

      const ndx = (e.clientX / window.innerWidth  - ROCK_CX) / ROCK_RX;
      const ndy = (e.clientY / window.innerHeight - ROCK_CY) / ROCK_RY;
      const dist = Math.sqrt(ndx * ndx + ndy * ndy);
      proxTarget = Math.max(0, 1 - dist / 1.5);
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      curBgTX += (bgTX - curBgTX) * 0.06;
      curBgTY += (bgTY - curBgTY) * 0.06;
      if (bgImgRef.current) {
        bgImgRef.current.style.transform = `scale(1.045) translate(${curBgTX}px, ${curBgTY}px)`;
      }
      proxCurrent += (proxTarget - proxCurrent) * 0.032;
      proximity.current = proxCurrent;
      if (warmRef.current) warmRef.current.style.opacity = String(proxCurrent);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => { fadeRefs.current[i] = el; };

  return (
    <section id="about" style={{ position: "relative", width: "100vw", height: "100svh", overflow: "hidden" }}>
      {/* Layer 1 — background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgImgRef}
          src="/anniezeng/assets/background-clean.png"
          alt="Mountain valley landscape with floating rock"
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transform: "scale(1.045)", display: "block" }}
        />
      </div>

      {/* Layer 2 — birds */}
      <BirdsCanvas />

      {/* Layer 3 — pollen */}
      <PollenCanvas proximityRef={proximity} />

      {/* Layer 4 — warm proximity glow */}
      <div
        ref={warmRef}
        style={{
          position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", opacity: 0,
          background: "radial-gradient(ellipse 35% 45% at 70% 50%, rgba(220,190,110,0.18) 0%, transparent 70%)",
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Layer 4.5 — floating rock */}
      <div style={{
        position: "absolute", zIndex: 6,
        left: "70%", top: "50%",
        width: "min(42vw, 620px)", aspectRatio: "16 / 9",
        transform: "translate(-50%, -50%)",
      }}>
        <RockScene />
      </div>

      {/* Layer 5 — copy */}
      <div style={{
        position: "relative", zIndex: 10, maxWidth: 580,
        display: "grid", gridTemplateColumns: "minmax(300px, 0.9fr) minmax(400px, 1.1fr)",
        height: "100%", alignItems: "center",
        padding: "120px clamp(40px, 5.5vw, 110px) 64px",
      }}>
        <div>
          <p ref={ref(0)} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400,
            letterSpacing: ".18em", textTransform: "uppercase",
            color: "rgba(26,23,20,0.52)", marginBottom: 18,
            opacity: 0, transform: "translateY(10px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.23,1,.32,1)",
          }} className="fade-basic">
            Full-Stack Developer
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 400,
            fontSize: "clamp(48px, 5.6vw, 80px)", lineHeight: 1.04,
            letterSpacing: "-.02em", color: "#1a1714", margin: "0 0 24px",
          }}>
            {["Hi, I'm Jiahui.", "I build thoughtful", "digital experiences."].map((line, i) => (
              <span key={line} style={{ overflow: "hidden", display: "block" }}>
                <span ref={ref(1 + i)} style={{
                  display: "block", opacity: 0, transform: "translateY(105%)",
                  transition: "opacity .9s cubic-bezier(.23,1,.32,1), transform .9s cubic-bezier(.23,1,.32,1)",
                }} className="fade-basic">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p ref={ref(4)} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 300,
            lineHeight: 1.76, color: "rgba(26,23,20,0.55)",
            maxWidth: 300, marginBottom: 34,
            opacity: 0, transform: "translateY(10px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.23,1,.32,1)",
          }} className="fade-basic">
            A developer who loves turning ideas into elegant, functional
            products — from clean code to thoughtful interaction design.
          </p>

          <div ref={ref(5)} style={{
            display: "flex", gap: 13, marginBottom: 28,
            opacity: 0, transform: "translateY(10px)",
            transition: "opacity .8s ease, transform .8s cubic-bezier(.23,1,.32,1)",
          }} className="fade-basic">
            <a href="#projects" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 500, letterSpacing: ".04em",
              padding: "14px 28px", background: "#1a1714", color: "#faf8f4",
              border: "none", borderRadius: 3, textDecoration: "none",
              transition: "transform .3s cubic-bezier(.23,1,.32,1), box-shadow .3s, background .25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.17)"; (e.currentTarget as HTMLElement).style.background = "#2e2924"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.background = "#1a1714"; }}
            >
              View My Work
            </a>
            <a href="#contact" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 400, letterSpacing: ".04em",
              padding: "14px 28px", background: "transparent", color: "#1a1714",
              border: "1.5px solid rgba(26,23,20,0.3)", borderRadius: 3, textDecoration: "none",
              transition: "transform .3s cubic-bezier(.23,1,.32,1), border-color .25s, background .25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,23,20,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(26,23,20,0.04)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,23,20,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              Get In Touch
            </a>
          </div>

          <p ref={ref(6)} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300,
            color: "rgba(26,23,20,0.4)", letterSpacing: ".05em",
            display: "flex", alignItems: "center", gap: 8,
            opacity: 0, transition: "opacity .8s ease",
          }} className="fade-basic">
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#7ec47a", flexShrink: 0,
              boxShadow: "0 0 0 2.5px rgba(126,196,122,0.22)",
            }} />
            Available for new opportunities
          </p>
        </div>
        <div />
      </div>

      <style>{`.fade-basic.in { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
