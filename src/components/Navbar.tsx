export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-lg tracking-tight">Jiahui Zeng</span>
        <div className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}
