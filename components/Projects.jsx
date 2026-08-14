"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projectList = [
  {
    title: "YouTube Hub",
    description: "A dynamic multi-level playlist and study resource management tool built for structured learning path tracking.",
    tags: ["JavaScript", "Tailwind CSS", "oEmbed API", "Vercel"],
    github: "https://github.com/adi2105-co/YOUTUBE-HUB",
    live: "https://youtube-hub-fawn.vercel.app/"
  },
  {
    title: "HopeScan",
    description: "Software application designed for streamlining localized asset tracking and data processing workflows.",
    tags: ["Node.js", "React", "SQL", "Git"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-10">Featured Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectList.map((proj, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 hover:border-red-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{proj.title}</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-bold text-red-400 bg-red-950/30 border border-red-900/40 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-4 border-t border-white/5">
              <a href={proj.live} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white flex items-center gap-1.5 hover:text-red-400 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-400 flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg> Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}