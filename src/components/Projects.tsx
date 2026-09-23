"use client";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Project One",
    description: "A full-stack web application built with modern technologies. Replace this with your actual project description.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/JiaJia-Hui",
  },
  {
    title: "Project Two",
    description: "An innovative solution that solves real-world problems. Replace this with your actual project description.",
    tags: ["Python", "FastAPI", "Docker"],
    github: "https://github.com/JiaJia-Hui",
  },
  {
    title: "Project Three",
    description: "A mobile-first experience with smooth interactions. Replace this with your actual project description.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    github: "https://github.com/JiaJia-Hui",
  },
];

export default function Projects() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const i = parseInt(el.dataset.i || "0");
          setTimeout(() => el.classList.add("in"), i * 100);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    cardRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" style={{ padding: "120px clamp(40px, 5.5vw, 110px)", background: "rgba(26,23,20,0.04)" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>
        Selected Work
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(36px, 4vw, 54px)", color: "var(--fg)", marginBottom: 60, letterSpacing: "-.01em" }}>
        Projects
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
        {projects.map((p, i) => (
          <div
            key={p.title}
            ref={el => { cardRefs.current[i] = el; }}
            data-i={i}
            className="fade-up"
            style={{
              background: "var(--bg-card)", borderRadius: 4,
              padding: "32px 28px", border: "1px solid var(--border)",
              transition: "transform .35s cubic-bezier(.23,1,.32,1), box-shadow .35s, opacity .85s cubic-bezier(.23,1,.32,1), transform .85s cubic-bezier(.23,1,.32,1)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(26,23,20,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 22, color: "var(--fg)", marginBottom: 12, letterSpacing: "-.01em" }}>
              {p.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, fontWeight: 300, lineHeight: 1.7, color: "var(--fg-muted)", marginBottom: 20 }}>
              {p.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 24 }}>
              {p.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: ".08em",
                  padding: "4px 10px", border: "1px solid var(--border)",
                  borderRadius: 2, color: "var(--fg-muted)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 400,
              color: "var(--fg)", textDecoration: "none", letterSpacing: ".05em",
              borderBottom: "1px solid var(--border)",
              paddingBottom: 2,
            }}>
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
