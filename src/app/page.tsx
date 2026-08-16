import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Credentials from "@/components/sections/Credentials";
import Cta from "@/components/sections/Cta";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Showcase from "@/components/sections/Showcase";
import Testimonials from "@/components/sections/Testimonials";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";

/**
 * Section order follows the reference layouts: the poster fold, who she is,
 * the work, what she can be hired for, one project in full, the writing, then
 * the proof and the ask.
 *
 * Sections are separated by hairline rules rather than by alternating fills —
 * the reference's rhythm device. The two saturated surfaces are the hero panel
 * and the showcase mount (rose) plus the quotes (ink); everything else is
 * paper, so the colour lands where it means something.
 */
export default function Home() {
  return (
    <>
      {/* Header overlays the hero, so the two share a stacking context. */}
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <main className="flex-1">
        <About />
        <Work />
        <Services />
        <Showcase />
        <Writing />
        <Testimonials />
        <Credentials />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
