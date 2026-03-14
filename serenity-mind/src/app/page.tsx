import Header from "@/components/Header";
import ScrollStopHero from "@/components/ScrollStopHero";
import Services from "@/components/Services";
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
 * 3. Services — what we offer
 * 4. About / Why Us — differentiator
 * 5. Conditions — SEO value, self-identification
 * 6. How It Works — reduce anxiety with clear steps
 * 7. FAQ — objection handling
 * 8. Contact — convert
 * 9. Footer
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

      {/* Core offerings */}
      <Services />

      {/* Why choose us — 3-card layout */}
      <About />

      {/* Conditions we specialize in — SEO + self-identification */}
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
