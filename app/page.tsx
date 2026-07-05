import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Writing } from "@/components/sections/Writing";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { GitHubStats } from "@/components/ui/GitHubStats";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-bg text-text">
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <main id="main" role="main">
        <Hero />
        <Marquee />
        <div className="container-x -mt-2 mb-4">
          <GitHubStats />
        </div>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
