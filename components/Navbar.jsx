"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
        <span className="font-extrabold text-white tracking-wider text-sm">PORTFOLIO</span>
        <div className="flex gap-6 text-xs font-semibold text-slate-300">
          <a href="#about" className="hover:text-red-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-red-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}