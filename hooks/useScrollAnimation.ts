// hooks/useScrollAnimation.ts
import { useScroll, useTransform, useSpring, motionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax values
  const parallaxY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);

  // Rotation based on scroll
  const rotation = useTransform(smoothProgress, [0, 1], [0, 360]);

  // Background color change
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#ffffff", "#f0f9ff", "#e0f2fe"]
  );

  return { smoothProgress, parallaxY, rotation, backgroundColor };
};

// hooks/useViewportAnimation.ts
import { useInView, useAnimation } from "framer-motion";

export const useViewportAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return { ref, controls, isInView };
};
