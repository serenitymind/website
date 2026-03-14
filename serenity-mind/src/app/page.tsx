import Header from "@/components/Header";
import ScrollStopHero from "@/components/ScrollStopHero";
import Services from "@/components/Services";

/**
 * Home page — V2 scroll-stop landing page
 *
 * HOW THE SCROLL-STOP WORKS:
 * 1. User lands on the page → sees the hero with first text overlay
 * 2. As they scroll, the video plays frame-by-frame (driven by scroll position)
 * 3. Text transitions between breakpoints defined in ScrollStopHero.tsx
 * 4. After the hero finishes, normal scrolling resumes into Services, etc.
 *
 * TO ADD YOUR VEO3 VIDEO:
 * 1. Generate your 8-second video in Veo3
 * 2. Compress it (ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow hero-video.mp4)
 * 3. Place it at /public/hero-video.mp4
 * 4. Optionally add a poster frame at /public/hero-poster.jpg
 * 5. Remove the placeholder gradient div in ScrollStopHero.tsx
 *
 * TO CUSTOMIZE BREAKPOINTS:
 * Edit the BREAKPOINTS array in src/components/ScrollStopHero.tsx
 */
export default function Home() {
  return (
    <main>
      {/* Fixed header — always visible */}
      <Header />

      {/* Scroll-stop hero — video plays as user scrolls */}
      <ScrollStopHero />

      {/* Normal sections resume below */}
      <Services />

      {/* TODO: Add remaining sections */}
      {/* <About /> */}
      {/* <Testimonials /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </main>
  );
}
