"use client";
import { useRef } from "react";

export default function Navbar() {
  const talkRef = useRef<HTMLAnchorElement>(null);

  const onTalkMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = talkRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${dx * 0.08}px, ${dy * 0.08}px)`;
  };
  const onTalkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (talkRef.current) talkRef.current.style.transform = "";
    (e.currentTarget as HTMLElement).style.boxShadow = "";
  };

  return (
    <nav style={{
      position: "fixed", inset: "0 0 auto", zIndex: 50,
      display: "grid", gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "22px clamp(32px, 4.5vw, 72px)",
      background: "linear-gradient(to bottom, rgba(240,235,220,0.28) 0%, transparent 100%)",
    }}>
      <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 400, color: "#1a1714", textDecoration: "none", letterSpacing: "-.01em", justifySelf: "start" }}>
        JZ
      </a>

      <ul style={{ justifySelf: "center", display: "flex", listStyle: "none", gap: "clamp(26px, 3.5vw, 56px)", margin: 0, padding: 0 }}>
        {["About","Experience","Projects","Skills","Contact"].map(item => (
          <li key={item} style={{ position: "relative" }}>
            <a href={`#${item.toLowerCase()}`} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 400,
              color: "rgba(26,23,20,0.62)", textDecoration: "none", letterSpacing: ".01em",
              position: "relative", paddingBottom: 2,
              transition: "color .3s",
            }}
            className="nav-link"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a
        ref={talkRef}
        href="#contact"
        onMouseMove={onTalkMove}
        onMouseLeave={onTalkLeave}
        style={{
          justifySelf: "end",
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: ".05em",
          padding: "13px 28px",
          background: "#1a1714", color: "#faf8f4",
          border: "none", borderRadius: 3, textDecoration: "none",
          transition: "transform .12s ease-out, box-shadow .3s",
          display: "inline-block",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)"; }}
      >
        Let&apos;s Talk
      </a>

      <style>{`
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: #1a1714;
          transition: width .35s cubic-bezier(.23,1,.32,1);
        }
        .nav-link:hover { color: #1a1714 !important; }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </nav>
  );
}
