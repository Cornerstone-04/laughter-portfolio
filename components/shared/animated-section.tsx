import { m as motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

// Reusable section wrapper: handles scroll-in animation once.
export function Section({
  children,
  amount = 0.2, // % of element in view before animating
  delay = 0,
}: PropsWithChildren<{ amount?: number; delay?: number }>) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUp}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.8, ease: "easeOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}
