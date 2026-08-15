"use client";
import { motion } from "framer-motion";

const skills = [
  // Core & Low-Level
  { name: "C / C++", category: "Systems" },
  { name: "Problem Solving & DSA", category: "Core" },

  // Cybersecurity & Defense
  { name: "System Security & Defense", category: "Cybersecurity" },
  { name: "Network Protocol Analysis", category: "Networking" },
  { name: "Ethical Hacking Basics", category: "Security" },

  // Development & Web
  { name: "Full-Stack Web Dev", category: "Web" },
  { name: "React / Next.js", category: "Frontend" },
  { name: "Modern UI / UX Design", category: "UI Dev" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js & Express", category: "Backend" },

  // Workflow & Tools
  { name: "Vibe Coding & AI Tooling", category: "Workflow" },
  { name: "Linux Administration", category: "OS" },
  { name: "Git & Version Control", category: "DevOps" },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-2">Tech Stack & Domain Focus</h2>
      <p className="text-slate-400 text-sm mb-10">Systems, security, full-stack building, and modern workflows.</p>

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
