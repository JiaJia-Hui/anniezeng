const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "REST APIs"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "Linux", "VS Code", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Skills</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Technologies I work with</p>
        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-sm uppercase tracking-widest">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
