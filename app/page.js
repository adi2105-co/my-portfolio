import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#08080a] text-slate-100 min-h-screen selection:bg-red-500 selection:text-white">
      <Navbar />
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
      
      <footer className="text-center py-8 text-xs text-slate-600 border-t border-white/5">
        © {new Date().getFullYear()} Aditya Singh — Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}