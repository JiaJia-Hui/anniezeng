import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer style={{
        padding: "32px clamp(40px, 5.5vw, 110px)",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap" as const, gap: 12,
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "var(--fg)", fontWeight: 400 }}>JZ</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 300, color: "var(--fg-soft)", letterSpacing: ".04em" }}>
          © {new Date().getFullYear()} Jiahui Zeng
        </span>
      </footer>
    </>
  );
}
