"use client";
import { useEffect, useRef } from "react";

const groups = [
  { category: "Frontend",       skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"] },
  { category: "Backend",        skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "REST APIs"] },
  { category: "Tools & Others", skills: ["Git", "Docker", "Linux", "VS Code", "Figma"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
            setTimeout(() => el.classList.add("in"), i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: "120px clamp(40px, 5.5vw, 110px)" }}>
      <p className="fade-up" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 10 }}>
        Expertise
      </p>
      <h2 className="fade-up" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(36px, 4vw, 54px)", color: "var(--fg)", marginBottom: 60, letterSpacing: "-.01em" }}>
        Skills
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "48px 40px" }}>
        {groups.map(g => (
          <div key={g.category} className="fade-up">
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: ".14em", textTransform: "uppercase",
              color: "var(--fg-soft)", marginBottom: 20,
              borderBottom: "1px solid var(--border)", paddingBottom: 12,
            }}>
              {g.category}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {g.skills.map(s => (
                <li key={s} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 300,
                  color: "var(--fg)", display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--fg-soft)", flexShrink: 0 }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
