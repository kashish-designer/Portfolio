import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      {/* Header overlays the hero photograph, so the two share a stacking context. */}
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <main className="flex-1">
        <Work />
        <About />
        <Services />
        <Skills />
      </main>
    </>
  );
}
