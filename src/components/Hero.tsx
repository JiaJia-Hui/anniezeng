export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center pt-16">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-sm font-mono text-indigo-500 dark:text-indigo-400 mb-4 tracking-widest uppercase">Hello, I&apos;m</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Jiahui Zeng
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
          A passionate developer building thoughtful digital experiences.
          I love turning ideas into elegant, functional products.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-lg font-medium transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
