import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Jiahui Zeng. Built with Next.js & Tailwind CSS.
      </footer>
    </>
  );
}
