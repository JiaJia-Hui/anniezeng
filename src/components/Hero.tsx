"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => el.classList.add("in"), i * 120);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => { refs.current[i] = el; };

  return (
    <section id="about" style={{
      minHeight: "100svh", display: "flex", alignItems: "center",
      padding: "120px clamp(40px, 5.5vw, 110px) 80px",
    }}>
      <div style={{ maxWidth: 600 }}>
        <p className="fade-up" ref={ref(0)} style={{
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400,
          letterSpacing: ".18em", textTransform: "uppercase",
          color: "var(--fg-muted)", marginBottom: 20,
        }}>
          Hello, I&apos;m
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 400,
          fontSize: "clamp(52px, 6vw, 84px)", lineHeight: 1.04,
          letterSpacing: "-.02em", color: "var(--fg)",
          margin: "0 0 8px",
        }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="fade-up" ref={ref(1)} style={{ display: "block" }}>Jiahui</span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span className="fade-up" ref={ref(2)} style={{ display: "block", fontStyle: "italic" }}>Zeng</span>
          </span>
        </h1>

        <p className="fade-up" ref={ref(3)} style={{
          fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 300,
          lineHeight: 1.76, color: "var(--fg-muted)",
          maxWidth: 320, margin: "28px 0 36px",
        }}>
          A passionate developer building thoughtful digital experiences.
          I love turning ideas into elegant, functional products.
        </p>

        <div className="fade-up" ref={ref(4)} style={{ display: "flex", gap: 13, marginBottom: 28 }}>
          <a href="#projects" style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 500, letterSpacing: ".04em",
            padding: "14px 28px", background: "var(--fg)", color: "#faf8f4",
            border: "none", borderRadius: 3, textDecoration: "none",
            transition: "transform .3s cubic-bezier(.23,1,.32,1), box-shadow .3s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.17)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            View Work
          </a>
          <a href="#contact" style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 400, letterSpacing: ".04em",
            padding: "14px 28px", background: "transparent", color: "var(--fg)",
            border: "1.5px solid var(--border)", borderRadius: 3, textDecoration: "none",
            transition: "transform .3s cubic-bezier(.23,1,.32,1), border-color .25s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,23,20,0.6)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            Get In Touch
          </a>
        </div>

        <div className="fade-up" ref={ref(5)} style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300,
          color: "var(--fg-soft)", letterSpacing: ".05em",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#7ec47a", flexShrink: 0,
            boxShadow: "0 0 0 2.5px rgba(126,196,122,0.22)",
          }} />
          Available for new opportunities
        </div>
      </div>
    </section>
  );
}
