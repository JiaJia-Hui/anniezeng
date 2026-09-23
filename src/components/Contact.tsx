"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
            setTimeout(() => el.classList.add("in"), i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "120px clamp(40px, 5.5vw, 110px)", background: "rgba(26,23,20,0.04)" }}>
      <p className="fade-up" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>
        Get In Touch
      </p>
      <h2 className="fade-up" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(36px, 4vw, 54px)", color: "var(--fg)", marginBottom: 24, letterSpacing: "-.01em" }}>
        Let&apos;s Work Together
      </h2>

      <p className="fade-up" style={{
        fontFamily: "'Inter', sans-serif", fontSize: 14.5, fontWeight: 300,
        lineHeight: 1.76, color: "var(--fg-muted)", maxWidth: 400, marginBottom: 48,
      }}>
        I&apos;m currently open to new opportunities. Whether you have a project
        in mind or just want to say hello, feel free to reach out.
      </p>

      <div className="fade-up" style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
        <a href="mailto:zengjiahui7211@gmail.com" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400,
          color: "var(--fg)", textDecoration: "none",
          borderBottom: "1px solid var(--border)", paddingBottom: 4,
          width: "fit-content",
          transition: "border-color .3s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fg)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          zengjiahui7211@gmail.com
        </a>

        <a href="https://github.com/JiaJia-Hui" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400,
          color: "var(--fg)", textDecoration: "none",
          borderBottom: "1px solid var(--border)", paddingBottom: 4,
          width: "fit-content",
          transition: "border-color .3s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--fg)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          github.com/JiaJia-Hui
        </a>
      </div>
    </section>
  );
}
