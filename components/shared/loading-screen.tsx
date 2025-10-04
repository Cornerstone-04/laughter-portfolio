"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/loading-screen.css";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-white dark:bg-[#15151e] min-h-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="loader-container">
            <h1 className="loader-name text-le-purple">
              Laughter Ephraim
            </h1>
            <p className="loader-subtitle text-le-purple">
              Post-Production Editor
            </p>
            <div className="loader-progress">
              <div className="loader-progress-fill"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
