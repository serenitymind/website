"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   FRAME CONFIG
   Total frames extracted from the video.
   Frames live at /public/frames/frame-XXXX.jpg
   ============================================ */
const TOTAL_FRAMES = 192;

/* Pad frame number to 4 digits for file path */
const getFramePath = (i: number) =>
  `/frames/frame-${String(i).padStart(4, "0")}.jpg`;

/* ============================================
   BREAKPOINTS CONFIG — EDIT THESE
   start/end = scroll progress (0-1).
   Gap between breakpoints = crossfade zone.
   ============================================ */
const BREAKPOINTS = [
  {
    start: 0,
    end: 0.28,
    headline: "Eugenia Chen, M.D.",
    subline: "Board-Certified Adult Psychiatrist | Child & Adolescent Trained\nCompassionate, evidence-based care for all ages",
    showCTA: false,
  },
  {
    start: 0.33,
    end: 0.58,
    headline: "Holistic, Individualized Care\nfor Every Stage of Life",
    subline: "Experienced in treating: anxiety, depression, ADHD, PTSD, trauma, and more",
    showCTA: false,
  },
  {
    start: 0.63,
    end: 1.0,
    headline: "Take the First Step\nToward Mental Wellness",
    subline: "Book a confidential consultation today",
    showCTA: true,
  },
];

/* Scroll distance multiplier (5 = 5x viewport height) */
const SCROLL_MULTIPLIER = 5;
/* Fade duration for text transitions (fraction of timeline) */
const FADE_DURATION = 0.04;

/* Snap positions as scroll progress values (0-1) */
/* 0 = start, midpoints of BP1/BP2, 1.0 = exit hero into Services */
const SNAP_POINTS = [0, 0.455, 0.815, 1.0];

export default function ScrollStopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* Mobile video ref — we scrub it via currentTime instead of autoplaying.
     This mirrors the desktop frame-scrub behavior so scrolling drives playback. */
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Store preloaded images */
  const imagesRef = useRef<HTMLImageElement[]>([]);
  /* Track loading progress */
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  /* Mobile detection — null until mounted (SSR-safe).
     On mobile we use a real <video> instead of the frame sequence,
     so we skip preloading 192 JPGs and skip canvas drawing. */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  /* Wheel-based snap state */
  const currentSectionRef = useRef(0);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const cooldownRef = useRef(false);

  /* Detect mobile after mount (matchMedia is window-only) */
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const setActiveDot = useCallback((idx: number) => {
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  /* ============================================
     STEP 1: Preload all frame images on mount
     Skipped on mobile — mobile uses the <video> element,
     so downloading 192 JPGs would be wasted bandwidth.
     ============================================ */
  useEffect(() => {
    /* Wait until mobile detection has resolved */
    if (isMobile === null) return;

    /* Mobile path — no frames needed, mark as "loaded" so loader hides */
    if (isMobile) {
      setLoaded(true);
      return;
    }

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        /* Update progress every 10 frames to avoid excessive re-renders */
        if (loadedCount % 10 === 0 || loadedCount === TOTAL_FRAMES) {
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        }
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [isMobile]);

  /* ============================================
     STEP 2: Once loaded, set up canvas + GSAP
     Drawing a pre-loaded image to canvas is INSTANT
     — no video decoding, no seeking, no choppiness
     ============================================ */
  useEffect(() => {
    if (!loaded) return;

    const container = containerRef.current;
    if (!container) return;

    /* updateMedia maps scroll progress (0..1) onto the right output:
       - Desktop: draws the matching JPG frame onto the canvas
       - Mobile: seeks the <video>'s currentTime
       Falling back to a no-op keeps the timeline safe if neither ref is ready. */
    let updateMedia: (progress: number) => void = () => {};

    if (isMobile) {
      /* Mobile path — scrub the <video> by setting currentTime.
         We don't play() the video; scroll position fully drives playback. */
      const video = videoRef.current;
      if (!video) return;

      updateMedia = (progress: number) => {
        /* video.duration is NaN until metadata loads — bail until it's ready */
        const dur = video.duration;
        if (!dur || isNaN(dur)) return;
        /* Clamp slightly under duration to avoid the "ended" state flicker */
        video.currentTime = Math.min(progress * dur, dur - 0.01);
      };
    } else {
      /* Desktop path — frame-by-frame canvas drawing (original behavior) */
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /* Set canvas size — crop bottom 50px to hide Veo3 watermark */
      const firstImg = imagesRef.current[0];
      const WATERMARK_CROP = 50;
      canvas.width = firstImg.naturalWidth;
      canvas.height = firstImg.naturalHeight - WATERMARK_CROP;

      /* Draw the first frame immediately */
      ctx.drawImage(firstImg, 0, 0);

      /* Track current frame to avoid redundant draws */
      let currentFrame = 0;

      /* ============================================
         Draw a specific frame to the canvas
         This is the core of why it's smooth —
         drawing a cached image is ~0.1ms vs
         video seeking which can take 10-50ms
         ============================================ */
      const drawFrame = (frameIndex: number) => {
        if (frameIndex === currentFrame) return; /* skip if same frame */
        const img = imagesRef.current[frameIndex];
        if (!img) return;
        ctx.drawImage(img, 0, 0);
        currentFrame = frameIndex;
      };

      updateMedia = (progress: number) => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );
        drawFrame(frameIndex);
      };
    }

    /* Build GSAP timeline */
    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true, /* instant — no smoothing lag */
          onUpdate: (self) => {
            const progress = self.progress;

            /* Drive whichever medium is active (canvas frames or video) */
            updateMedia(progress);

            /* Sync section tracker when not mid-animation */
            if (!cooldownRef.current) {
              let nearest = 0;
              let minDist = Infinity;
              SNAP_POINTS.forEach((p, i) => {
                const dist = Math.abs(progress - p);
                if (dist < minDist) { minDist = dist; nearest = i; }
              });
              currentSectionRef.current = nearest;
            }

            /* Update active dot */
            const idx = BREAKPOINTS.findIndex(
              (bp) => progress >= bp.start && progress <= bp.end
            );
            setActiveDot(idx >= 0 ? idx : BREAKPOINTS.length - 1);
          },
        },
      });

      /* Force timeline to span full 0→1 so scroll progress maps 1:1 */
      tl.set({}, {}, 1.0);

      /* Text fade transitions via GSAP timeline */
      BREAKPOINTS.forEach((bp, i) => {
        const el = textRefs.current[i];
        if (!el) return;

        if (i === 0) {
          gsap.set(el, { opacity: 1 });
          tl.to(el, { opacity: 0, duration: FADE_DURATION, ease: "power2.inOut" }, bp.end);
        } else {
          gsap.set(el, { opacity: 0 });
          tl.to(el, { opacity: 1, duration: FADE_DURATION, ease: "power2.inOut" }, bp.start);
          if (bp.end < 1.0) {
            tl.to(el, { opacity: 0, duration: FADE_DURATION, ease: "power2.inOut" }, bp.end);
          }
        }
      });
    }, container);

    return () => gsapCtx.revert();
  }, [loaded, isMobile, setActiveDot]);

  /* ============================================
     STEP 3: Wheel hijack — instant section snapping
     Intercepts scroll events inside the hero and
     forces an animated jump to the next/prev section.
     One scroll tick = one section jump, always.
     Disabled on touch devices — touch scroll has its own
     momentum/inertia behavior that doesn't fit a wheel-based
     snap model. Mobile users get native scroll through the
     hero, which still scrubs the canvas via ScrollTrigger.
     ============================================ */
  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    /* Skip wheel hijack on touch-primary devices (phones, tablets) */
    /* matchMedia "(pointer: coarse)" is the standard touch detection */
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      const containerTop = container.offsetTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;

      /* Only hijack wheel events when inside the hero scroll range */
      if (scrollY < containerTop - 5 || scrollY > containerTop + totalScroll + 5) return;

      /* Determine next section based on scroll direction */
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentSectionRef.current + direction;

      /* Past boundaries — let native scroll take over (exit hero) */
      if (nextIndex < 0 || nextIndex >= SNAP_POINTS.length) return;

      /* Block native scroll — we handle it */
      e.preventDefault();

      /* Cooldown active — ignore (prevents trackpad rapid-fire) */
      if (cooldownRef.current) return;

      currentSectionRef.current = nextIndex;
      cooldownRef.current = true;

      /* Calculate target scroll position in pixels */
      const targetY = containerTop + SNAP_POINTS[nextIndex] * totalScroll;

      /* Kill any in-progress animation — override immediately */
      if (scrollTweenRef.current) scrollTweenRef.current.kill();

      /* Animate scroll to target section */
      scrollTweenRef.current = gsap.to({ y: scrollY }, {
        y: targetY,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function () {
          window.scrollTo(0, this.targets()[0].y);
        },
        onComplete: () => {
          cooldownRef.current = false;
        },
      });
    };

    /* passive: false required to call preventDefault */
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Desktop: canvas drives the frame-by-frame scroll scrub.
            Mobile: a real <video> autoplays in a loop — simpler, lighter,
            and avoids preloading 192 JPGs on cellular connections.
            We branch on `isMobile` (null during SSR so neither renders until
            mount, which keeps hydration consistent). */}
        {isMobile === false && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        )}
        {isMobile === true && (
          <video
            src="/hero-mobile-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        )}

        {/* Loading indicator — shown while frames preload */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-sm text-text-muted">
                Loading experience... {loadProgress}%
              </span>
            </div>
          </div>
        )}

        {/* Text overlays — GSAP controls opacity, all centered */}
        {BREAKPOINTS.map((bp, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="flex flex-col items-center w-full px-10 md:px-0">
              <div className="max-w-[720px] flex flex-col gap-4 md:gap-5 items-center text-center">
                <h1 className="font-heading text-[32px] md:text-[44px] lg:text-[52px] font-bold text-text-primary leading-[1.1] tracking-[-1px] md:tracking-[-1.5px] whitespace-pre-line text-center">
                  {bp.headline}
                </h1>
                {/* Subline — narrower max-w on mobile so it doesn't stretch edge-to-edge */}
                <p className="text-[14px] md:text-lg text-text-secondary leading-relaxed max-w-[280px] md:max-w-[580px] text-center whitespace-pre-line">
                  {bp.subline}
                </p>
                {bp.showCTA && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 mt-2 rounded-lg bg-text-primary text-white text-[14px] md:text-[15px] font-medium hover-purple hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-200 pointer-events-auto hover-bounce"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Scroll dot indicators — pulled in tighter on mobile */}
        <div className="absolute bottom-8 md:bottom-12 left-5 md:left-16 z-30 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {BREAKPOINTS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-accent" : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-white/60 tracking-[2px] uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
}
