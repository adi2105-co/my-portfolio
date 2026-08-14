"use client";
import { motion } from "framer-motion";

const skills = [
  { name: "Node.js", category: "Backend" },
  { name: "React / Next.js", category: "Frontend" },
  { name: "JavaScript / ES6+", category: "Language" },
  { name: "SQL & Databases", category: "Data" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Git & GitHub", category: "DevOps" },
  { name: "REST APIs", category: "Architecture" },
  { name: "Vercel / Deployment", category: "Cloud" },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-2">Tech Stack</h2>
      <p className="text-slate-400 text-sm mb-10">Technologies and tools I use to bring ideas to life.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-slate-900/40 border border-white/10 rounded-xl p-4 text-center hover:border-red-500/40 hover:bg-slate-900/60 transition-all group"
          >
            <span className="text-xs font-semibold text-red-500 block mb-1 uppercase tracking-wider">{skill.category}</span>
            <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}