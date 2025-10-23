/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const NUM_PANELS = 8;
const PANEL_INDICES = Array.from({ length: NUM_PANELS }, (_, i) => i);

const panelVariants: Variants = {
  initial: { y: 0 },

  animate: (i: number): TargetAndTransition => ({
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: [0.6, 0.01, -0.05, 0.9] as any,
      delay: i * 0.08,
    },
  }),

  exit: (i: number): TargetAndTransition => ({
    y: 0,
    transition: {
      duration: 0.3,

      ease: [0.76, 0.05, 0.24, 1] as any,
      delay: (NUM_PANELS - 1 - i) * 0.08,
    },
  }),
};

export default function CurtainTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="fixed inset-0 z-9999 pointer-events-none"
      >
        {PANEL_INDICES.map((i) => (
          <motion.div
            key={i}
            custom={i} // Pass the index to the panel variants
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 bottom-0 bg-black"
            style={{
              // Distribute the panels horizontally
              left: `${(i / NUM_PANELS) * 100}%`,
              width: `${(1 / NUM_PANELS) * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
