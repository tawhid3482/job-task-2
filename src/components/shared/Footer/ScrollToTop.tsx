import { motion, useAnimation } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useEffect } from "react";

export default function ScrollToTopButton({ scrollToTop }) {
  const controls = useAnimation();

  // ripple animation trigger
  const handleClick = () => {
    controls.start({
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 0],
      transition: { duration: 0.6 },
    });
    scrollToTop();
  };

  return (
    <div className="fixed bottom-5 right-5 w-14 h-14">
      {/* ripple effect circle */}
      <motion.div
        animate={controls}
        className="absolute w-full h-full rounded-full bg-blue-400 opacity-50"
      />
      <motion.button
        onClick={handleClick}
        className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-white text-2xl" />
      </motion.button>
    </div>
  );
}
