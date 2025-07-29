import React from "react";
import { motion, Variants } from "framer-motion";

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  shrink: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutPanel = () => (
  <motion.div
    className="w-full h-full flex items-center justify-center p-6 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-none rounded-2xl shadow-lg"
    variants={variants}
    initial="initial"
    animate="shrink"
  >
    <div className="text-center w-full">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">김동건</h2>
      <p className="text-gray-700 dark:text-gray-300">풀스택 웹 개발자</p>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        React · Framer Motion · Tailwind 전문가
      </p>
    </div>
  </motion.div>
);

export default React.memo(AboutPanel);
