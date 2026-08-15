import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
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
      </main>
    </>
  );
}
