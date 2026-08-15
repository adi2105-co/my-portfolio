"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  // Track scroll position of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoothly fade out and scale down the image as you scroll away from Hero toward Tech Stack
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl flex flex-col items-center"
      >
        {/* Large Profile Image with Scroll Fade & Hover Glow */}
        <motion.div 
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="flex justify-center mb-8 relative group cursor-pointer"
        >
          {/* Subtle Outer Glow behind Image */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-rose-500 opacity-30 group-hover:opacity-80 blur-lg transition duration-500"></div>

          {/* Profile Image */}
          <motion.img 
            src="/images/image.png"
            alt="Aditya Singh"
            whileHover={{ scale: 1.08, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/20 shadow-2xl object-cover transition-all duration-300 group-hover:border-red-500/80"
          />
        </motion.div>

        {/* Updated Badge */}
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-full">
          Cybersecurity Enthusiast
        </span>

        {/* Updated Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-6 leading-tight">
          Securing networks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">building defense</span>.
        </h1>

        {/* Subtitle */}
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
