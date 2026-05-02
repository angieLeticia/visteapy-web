"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { stiffness: 120, damping: 24, mass: 0.5 });
  const springY = useSpring(trailY, { stiffness: 120, damping: 24, mass: 0.5 });

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [label, setLabel] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on devices with fine pointer (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        trailX.set(e.clientX);
        trailY.set(e.clientY);
      });

      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [data-cursor]") as HTMLElement | null;
      setIsPointer(!!el);

      const cursorLabel = el?.getAttribute("data-cursor-label") ?? "";
      setLabel(cursorLabel);
    };

    const hide = () => setIsHidden(true);
    const show = () => setIsHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-bone" />
      </motion.div>

      {/* Ring — springs behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full border border-ink/40 flex items-center justify-center overflow-hidden"
          animate={{
            width: isPointer ? (label ? 72 : 40) : 28,
            height: isPointer ? (label ? 72 : 40) : 28,
            borderColor: isPointer ? "rgba(193, 98, 47, 0.8)" : "rgba(15, 15, 15, 0.4)",
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {label && (
            <motion.span
              className="font-sans text-[9px] tracking-[0.18em] uppercase text-terracota text-center leading-tight px-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
