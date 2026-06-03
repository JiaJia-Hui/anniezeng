const projects = [
  {
    title: "Project One",
    description: "A full-stack web application built with modern technologies. Replace this with your actual project description.",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/JiaJia-Hui",
    demo: "#",
  },
  {
    title: "Project Two",
    description: "An innovative solution that solves real-world problems. Replace this with your actual project description.",
    tags: ["Python", "FastAPI", "Docker"],
    github: "https://github.com/JiaJia-Hui",
    demo: "#",
  },
  {
    title: "Project Three",
    description: "A mobile-first experience with smooth interactions. Replace this with your actual project description.",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    github: "https://github.com/JiaJia-Hui",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Projects</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Things I&apos;ve built</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
            >
              <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                  GitHub →
                </a>
                {project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
