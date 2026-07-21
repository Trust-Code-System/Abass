import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Writing } from "@/components/sections/Writing";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-bg text-text">
      <Navbar />
      <main id="main" role="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

