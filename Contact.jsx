"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-800/40 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-6">
          Let’s build something together.
        </h2>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
          Whether you have a project idea, want to collaborate, or just want to connect—feel free to reach out across any platform!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {/* GitHub */}
          <a
            href="https://github.com/adi2105-co"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all hover:border-red-500/40"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all hover:border-red-500/40"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* LeetCode */}
          <a
            href="https://leetcode.com/u/fdJtgFM2LO/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all hover:border-amber-500/40"
          >
            <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 24 24">
              <path d="M16.102 17.93l-2.697 2.607c-.766.741-1.808 1.157-2.898 1.157s-2.132-.416-2.898-1.157l-4.281-4.137c-.766-.741-1.196-1.748-1.196-2.802s.43-2.061 1.196-2.802l4.281-4.137c.766-.741 1.808-1.157 2.898-1.157s2.132.416 2.898 1.157l2.697 2.607c.391.378 1.024.378 1.415 0s.391-.99 0-1.368l-2.697-2.607c-1.149-1.111-2.712-1.735-4.313-1.735s-3.164.624-4.313 1.735l-4.281 4.137c-1.149 1.111-1.794 2.622-1.794 4.203s.645 3.092 1.794 4.203l4.281 4.137c1.149 1.111 2.712 1.735 4.313 1.735s3.164-.624 4.313-1.735l2.697-2.607c.391-.378.391-.99 0-1.368s-1.024-.378-1.415 0zM21.707 11.293l-8-8c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l8 8c.391.391 1.023.391 1.414 0s.391-1.023 0-1.414zM12 13h10c.552 0 1-.448 1-1s-.448-1-1-1H12c-.552 0-1 .448-1 1s.448 1 1 1z" />
            </svg>
            LeetCode <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/its_adityasingh21/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all hover:border-pink-500/40"
          >
            <svg className="w-4 h-4 fill-current text-pink-500" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}