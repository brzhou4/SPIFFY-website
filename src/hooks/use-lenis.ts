import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis for buttery, landonorris.com-style smooth scrolling
 * and exposes the instance on window for anchor links. Respects
 * prefers-reduced-motion by skipping smoothing.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      // Lower lerp = longer glide = smoother, more premium scroll feel.
      lerp: 0.06,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth-scroll anchor links
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -40 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
}
