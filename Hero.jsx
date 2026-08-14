"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        {/* Updated Badge */}
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-full">
          Cybersecurity Enthusiast
        </span>

        {/* Updated Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-6 leading-tight">
          Securing networks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">building defense</span>.
        </h1>

        {/* Updated Subtitle */}
        <p className="text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto">
          Passionate about exploring security vulnerabilities, ethical hacking, and crafting secure software solutions.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <a href="#projects" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-red-900/30">
            View Projects <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold px-6 py-3 rounded-full transition-all">
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}