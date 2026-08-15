import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import Why from "@/components/sections/Why";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";

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
        <Why />
        <Testimonials />
        <Contact />
        <Writing />
        <Certificates />
      </main>
    </>
  );
}
