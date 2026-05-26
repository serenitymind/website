"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   FRAME CONFIG
   Both desktop and mobile load from /public/frames/ (1440x810 landscape).
   On mobile we used to have a separate /public/frames-mobile/ portrait
   sequence, but the landscape frames give a much richer horizontal pan
   range on mobile (the canvas naturally overshoots the portrait viewport
   by hundreds of pixels, no zoom required). The portrait frames are kept
   on disk in case we want to switch back.
   ============================================ */
const TOTAL_FRAMES = 192;

/* Pad frame number to 4 digits — same source folder for desktop and mobile */
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
    headline: "Holistic, individualized psychiatric care\nacross the lifespan",
    subline: "Anxiety, depression, ADHD, PTSD, trauma, and related conditions",
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

/* Mobile uses a slightly nudged second snap point to land on a sharper
   frame for the BP2 pause. Stays inside BP2's text range (0.33–0.58) so
   headline visibility is unaffected. */
const MOBILE_SNAP_POINTS = [0, 0.48, 0.815, 1.0];

/* ============================================
   MOBILE HORIZONTAL PAN — right→left traversal
   At progress=0 the canvas's RIGHT edge is flush with the viewport's
   right edge (doctor side visible). At progress=1 the canvas's LEFT
   edge is flush with the viewport's left edge (patient side visible).

   Because the source frames are landscape (1440×810 → 1440×760 after
   watermark crop, aspect ~1.89), height-fitting them to a portrait
   mobile viewport produces a canvas that's ~2× viewport width — plenty
   of natural horizontal overshoot. No zoom needed.

   Why transform instead of object-position? object-position is flaky on
   <canvas> in practice — Chrome won't always repaint when it changes
   dynamically. transform always works.

   MOBILE_PAN_ZOOM:
   - 1.0 (default) = canvas at natural height-fit, no vertical cropping
     beyond the source aspect. Pan range = full overshoot (~1100px on
     a typical mobile viewport).
   - >1.0 zooms in vertically, increasing horizontal overshoot at the
     cost of cropping the top/bottom of the source.
   ============================================ */
const MOBILE_PAN_ZOOM = 1.0;

export default function ScrollStopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Store preloaded images */
  const imagesRef = useRef<HTMLImageElement[]>([]);
  /* Track loading progress */
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  /* Mobile detection — null until mounted (SSR-safe).
     Mobile and desktop both use canvas-based frame scrubbing; the only
     difference is which frame sequence we load (smaller portrait frames
     on mobile to keep the bandwidth cost reasonable on cellular). */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  /* Wheel-based snap state */
  const currentSectionRef = useRef(0);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const cooldownRef = useRef(false);

  /* Detect mobile after mount. We treat the canvas as "mobile" if EITHER
     the primary pointer is coarse (real touch device) OR the viewport is
     narrow (≤767px). The viewport check is important because devs often
     test mobile by resizing a desktop browser window — in that case
     `pointer: coarse` is false (mouse), but the layout is still mobile
     and we want the mobile pan behavior to engage. */
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(isCoarse || isNarrow);
  }, []);

  const setActiveDot = useCallback((idx: number) => {
    if (idx !== activeIndexRef.current) {
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    }
  }, []);

  /* ============================================
     STEP 1: Preload the frame sequence on mount.
     Desktop and mobile both pull from /frames/ now — same 192 landscape
     JPGs. The mobile experience differs in layout/pan, not in source.
     ============================================ */
  useEffect(() => {
    /* Wait until mobile detection has resolved (avoids loading the wrong
       sequence and re-downloading after the matchMedia result settles) */
    if (isMobile === null) return;

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

    /* updateMedia maps scroll progress (0..1) onto a canvas-drawn frame.
       Both desktop and mobile use the same logic — only the source frame
       sequence differs (preloaded above based on isMobile). */
    let updateMedia: (progress: number) => void = () => {};

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Set canvas size from the first frame's natural dimensions.
       Frames carry a Veo watermark in the bottom 50px that we crop off here.
       Same handling for desktop and mobile since both load /frames/ now. */
    const firstImg = imagesRef.current[0];
    const WATERMARK_CROP = 50;
    canvas.width = firstImg.naturalWidth;
    canvas.height = firstImg.naturalHeight - WATERMARK_CROP;

    /* Draw the first frame immediately so the canvas isn't blank on mount */
    ctx.drawImage(firstImg, 0, 0);

    /* ============================================
       Mobile sizing + initial pan
       Compute canvas display size from the parent's height so the canvas
       physically overshoots the viewport horizontally. Apply centered
       transform on first paint, and re-run on window resize (handles
       phone rotation). Desktop is untouched — Tailwind handles its sizing.
       ============================================ */
    let resizeHandler: (() => void) | null = null;
    if (isMobile) {
      const layoutCanvas = () => {
        const parentEl = canvas.parentElement;
        if (!parentEl) return;
        const parentH = parentEl.offsetHeight;
        const parentW = parentEl.offsetWidth;
        /* Display height = parentH × ZOOM, display width follows the source
           aspect ratio (read from the canvas drawing buffer — 1440×760 for
           landscape frames after the watermark crop, which gives a width of
           ~2× the parent height). The wider-than-viewport overshoot is what
           we pan through horizontally. */
        const sourceAspect = canvas.width / canvas.height;
        const displayH = parentH * MOBILE_PAN_ZOOM;
        const displayW = displayH * sourceAspect;
        canvas.style.height = `${displayH}px`;
        canvas.style.width = `${displayW}px`;
        /* Vertically center: shift canvas up by half the vertical overshoot */
        canvas.style.top = `${-(displayH - parentH) / 2}px`;
        canvas.style.left = "0px";
        /* Horizontal start position = RIGHT edge of canvas aligned with
           viewport right edge → translateX = -(canvasW - viewportW).
           That's the progress=0 starting state (doctor side). */
        const overhang = displayW - parentW;
        if (overhang > 0) {
          canvas.style.transform = `translateX(${-overhang}px)`;
        } else {
          canvas.style.transform = "translateX(0px)";
        }
      };
      /* First layout pass after the canvas mounts. rAF ensures the parent
         has its final dimensions before we measure. */
      requestAnimationFrame(layoutCanvas);
      resizeHandler = layoutCanvas;
      window.addEventListener("resize", resizeHandler);
    }

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

            /* Mobile-only: extreme right→left horizontal pan.
               Canvas is sized larger than viewport (see layoutCanvas).
               At progress=0 the canvas's RIGHT edge is aligned with the
               viewport's right edge (translateX = -overhang, showing
               the right side / doctor). At progress=1 the canvas's
               LEFT edge is aligned with the viewport's left edge
               (translateX = 0, showing the left side / patient).
               Since the snap tween animates scroll with a power2.out
               ease, this lerp inherits that easing for free — pan,
               frame scrub and text fades all stay in lockstep. */
            if (isMobile) {
              const parentEl = canvas.parentElement;
              const viewportW = parentEl ? parentEl.offsetWidth : 0;
              const canvasW = canvas.offsetWidth;
              const overhang = canvasW - viewportW;
              if (overhang > 0) {
                /* Lerp: progress=0 → -overhang (right-aligned)
                          progress=1 → 0          (left-aligned) */
                const tx = -overhang * (1 - progress);
                canvas.style.transform = `translateX(${tx}px)`;
              }
            }

            /* Sync section tracker when not mid-animation */
            if (!cooldownRef.current) {
              /* Mobile uses a slightly different snap layout — keep section
                 tracking in lockstep so the dot indicator and snap targets
                 don't drift apart. */
              const points = isMobile ? MOBILE_SNAP_POINTS : SNAP_POINTS;
              let nearest = 0;
              let minDist = Infinity;
              points.forEach((p, i) => {
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

    return () => {
      gsapCtx.revert();
      /* Clean up the mobile resize listener so it doesn't leak when the
         component remounts (e.g. fast-refresh in dev, or route change). */
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, [loaded, isMobile, setActiveDot]);

  /* ============================================
     STEP 3: Scroll hijack — section snapping
     Wheel (desktop) and touch (mobile) both feed
     the same snap helper so behavior is identical:
     one input gesture = one section jump.
     ============================================ */
  useEffect(() => {
    if (!loaded) return;
    const container = containerRef.current;
    if (!container) return;

    /* Pick the right snap-point table for this device. Lengths match,
       so boundary checks are equivalent — only the target positions
       differ between mobile and desktop. */
    const snapPoints = isMobile ? MOBILE_SNAP_POINTS : SNAP_POINTS;

    /* Shared snap helper — returns true if a snap was triggered,
       false if the gesture should fall through to native scroll
       (i.e. user is past the hero boundaries). */
    const snap = (direction: 1 | -1): boolean => {
      const containerTop = container.offsetTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;

      /* Bail if not inside hero scroll range */
      if (scrollY < containerTop - 5 || scrollY > containerTop + totalScroll + 5) {
        return false;
      }

      const nextIndex = currentSectionRef.current + direction;
      /* Past boundaries — let native scroll take over (exit hero) */
      if (nextIndex < 0 || nextIndex >= snapPoints.length) return false;

      /* Cooldown — we consumed the gesture but don't fire a new tween */
      if (cooldownRef.current) return true;

      currentSectionRef.current = nextIndex;
      cooldownRef.current = true;

      const SNAP_DURATION = 0.5;
      const targetY = containerTop + snapPoints[nextIndex] * totalScroll;
      if (scrollTweenRef.current) scrollTweenRef.current.kill();

      scrollTweenRef.current = gsap.to({ y: scrollY }, {
        y: targetY,
        duration: SNAP_DURATION,
        ease: "power2.out",
        onUpdate: function () {
          window.scrollTo(0, this.targets()[0].y);
        },
        onComplete: () => {
          cooldownRef.current = false;
        },
      });

      /* The scroll tween above updates window.scrollY → ScrollTrigger fires
         onUpdate → updateMedia draws the matching canvas frame. So the
         canvas, text fades, and scroll position all ride the exact same
         power2.out curve. Same mechanic on desktop and mobile. */
      return true;
    };

    /* --- Desktop: wheel events ----------------------------------- */
    const handleWheel = (e: WheelEvent) => {
      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      /* Peek at boundary state without committing — same check as snap() */
      const containerTop = container.offsetTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY < containerTop - 5 || scrollY > containerTop + totalScroll + 5) return;
      const peekNext = currentSectionRef.current + direction;
      if (peekNext < 0 || peekNext >= snapPoints.length) return;

      /* Block native scroll, then attempt snap (no-op if cooling down) */
      e.preventDefault();
      snap(direction);
    };

    /* --- Mobile: touch events ------------------------------------ */
    /* Strategy: block touchmove while inside the hero (so the page
       doesn't scroll freely), then on touchend translate the swipe
       distance into a single section jump. This mirrors the wheel
       behavior — one swipe = one section. */
    let touchStartY = 0;
    let touchInsideHero = false;
    const SWIPE_THRESHOLD = 20; /* pixels — ignore taps & tiny drags */

    const handleTouchStart = (e: TouchEvent) => {
      const containerTop = container.offsetTop;
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const insideRange =
        scrollY >= containerTop - 5 && scrollY <= containerTop + totalScroll + 5;

      /* When the user is at the final snap point (= end of the hero), don't
         hijack their swipe — they need to be able to scroll natively out
         into the next page section. The wheel handler already has the
         equivalent escape because it knows direction from deltaY; touch
         only gets direction at touchend, by which point we've already
         preventDefault'd everything. Trade-off: backward snap from the
         last section is unavailable here — a downward swipe scrolls
         natively (canvas still scrubs via ScrollTrigger), which is the
         lesser annoyance vs. being trapped at the end of the hero. */
      const atFinalSnap =
        currentSectionRef.current >= snapPoints.length - 1;

      touchInsideHero = insideRange && !atFinalSnap;
      if (touchInsideHero) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      /* Block native scroll inside the hero so the page stays put
         until we decide which section to snap to on touchend */
      if (touchInsideHero) e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchInsideHero) return;
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY; /* >0 = swiped up = next section */
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      const direction: 1 | -1 = delta > 0 ? 1 : -1;
      snap(direction);
    };

    /* passive: false required so we can preventDefault */
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [loaded, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas drives the frame-by-frame scroll scrub on BOTH desktop
            and mobile. We gate on `isMobile !== null` so the canvas only
            mounts after we've decided which frame folder to preload from —
            that avoids a flash of the wrong-aspect frame on first paint. */}
        {/* Canvas — desktop uses object-cover to fit the viewport. Mobile
            sets explicit pixel width/height in JS (avoids CSS aspect-ratio
            quirks on <canvas>) so the element physically overshoots the
            viewport horizontally; JS then translates it to pan. The sticky
            parent's overflow-hidden clips the overshoot. */}
        {isMobile !== null && (
          <canvas
            ref={canvasRef}
            className={
              isMobile
                ? "absolute top-0 left-0 z-0 will-change-transform"
                : "absolute inset-0 w-full h-full object-cover object-center z-0"
            }
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

        {/* Text overlays — GSAP controls opacity, all centered.
            Mobile: shift the centered block up so the headline + subline
            land in the empty purple area above the subject's head. Desktop
            keeps the original dead-center placement. */}
        {BREAKPOINTS.map((bp, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none -translate-y-[14%] md:translate-y-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="flex flex-col items-center w-full px-10 md:px-0">
              <div className="max-w-[720px] lg:max-w-[1100px] flex flex-col gap-4 md:gap-5 items-center text-center">
                <h1 className="font-heading text-[32px] md:text-[44px] lg:text-[52px] font-bold text-text-primary leading-[1.1] tracking-[-1px] md:tracking-[-1.5px] whitespace-pre-line text-center">
                  {bp.headline}
                </h1>
                {/* Subline — narrower max-w on mobile so it doesn't stretch edge-to-edge */}
                <p className="text-[14px] md:text-lg text-text-secondary leading-relaxed max-w-[340px] md:max-w-[580px] text-center whitespace-pre-line">
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
