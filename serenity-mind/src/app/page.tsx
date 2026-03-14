import Header from "@/components/Header";
import ScrollStopHero from "@/components/ScrollStopHero";
import About from "@/components/About";
import Conditions from "@/components/Conditions";
import Process from "@/components/Process";
import DoctorBio from "@/components/DoctorBio";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * Home page — scroll-stop landing page
 *
 * Section order (optimized for trust-first conversion):
 * 1. Hero (scroll-stop video) — emotional hook
 * 2. Doctor Bio — face + trust early
 * 3. About / Why Us — differentiator
 * 4. Expertise (services + conditions merged) — what we offer + treat
 * 5. How It Works — reduce anxiety with clear steps
 * 6. FAQ — objection handling
 * 7. Contact — convert
 * 8. Footer
 */
export default function Home() {
  return (
    <main>
      {/* Fixed header — always visible */}
      <Header />

      {/* Scroll-stop hero — video plays as user scrolls */}
      <ScrollStopHero />

      {/* Doctor credentials — trust signal immediately */}
      <DoctorBio />

      {/* Why choose us — 3-card layout */}
      <About />

      {/* Services + conditions merged — dark glassmorphism grid */}
      <Conditions />

      {/* How to get started — reduces friction */}
      <Process />

      {/* Frequently asked questions — handle objections */}
      <FAQ />

      {/* Contact form + CTA — convert */}
      <Contact />

      {/* Site footer */}
      <Footer />
    </main>
  );
}
