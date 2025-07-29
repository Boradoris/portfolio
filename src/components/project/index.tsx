import React, { useState, useMemo, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectInfo from "./ProjectInfo";
import ProjectCard from "./ProjectCard";
import { ProjectT } from "@/types";
import { historyList } from "@/constants";

const slides: ProjectT[] = historyList.flatMap(company => company.projects).reverse();

const ProjectPanel = () => {
  const [active, setActive] = useState<ProjectT[]>(slides);
  const [removed, setRemoved] = useState<ProjectT[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const dirRef = useRef<number>(0);
  const offsetsRef = useRef<Record<string, { x: number; y: number; r: number }>>({});

  const stack = useMemo(() => {
    const maxX = 20,
      maxY = 10,
      maxR = 5,
      scaleStep = 0.01;
    return active.map((card, i) => {
      if (!offsetsRef.current[card.id]) {
        offsetsRef.current[card.id] = {
          x: (Math.random() * 2 - 1) * maxX,
          y: (Math.random() * 2 - 1) * maxY,
          r: (Math.random() * 2 - 1) * maxR,
        };
      }
      const { x, y, r } = offsetsRef.current[card.id];
      return {
        ...card,
        xOffset: x,
        yOffset: y,
        rotateOffset: r,
        scale: 1 - (active.length - 1 - i) * scaleStep,
      };
    });
  }, [active]);

  const next = useCallback(() => {
    if (!active.length) return;
    const last = active[active.length - 1];
    dirRef.current = 1;
    setActive(prev => prev.slice(0, -1));
    setRemoved(prev => [...prev, last]);
  }, [active]);

  const prev = useCallback(() => {
    if (!removed.length) return;
    const last = removed[removed.length - 1];
    dirRef.current = -1;
    setRemoved(prev => prev.slice(0, -1));
    setActive(prev => [...prev, last]);
  }, [removed]);

  useEffect(() => {
    if (active.length === 0) {
      setIsResetting(true);
      const t = window.setTimeout(() => {
        setActive(slides);
        setRemoved([]);
        setIsResetting(false);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [active]);

  const total = slides.length;
  const currentIndex = removed.length < total ? removed.length : 0;
  const currentSlide = active.length > 0 ? active[active.length - 1] : slides[0];

  const panelVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    shrink: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center gap-8 px-4"
      variants={panelVariants}
      initial="initial"
      animate="shrink"
    >
      <div className="relative w-[32rem] h-[26rem] sm:w-[36rem] sm:h-[28rem] md:w-[40rem] md:h-[30rem] lg:w-[44rem] lg:h-[32rem] max-w-[44rem] max-h-[32rem]">
        <AnimatePresence initial={false}>
          {stack.map((card, i) => (
            <ProjectCard
              key={card.id}
              card={card}
              index={i}
              isTop={i === stack.length - 1}
              onSwipe={next}
              dirRef={dirRef}
            />
          ))}
        </AnimatePresence>
      </div>
      <ProjectInfo
        slide={currentSlide}
        current={currentIndex}
        total={total}
        onPrev={prev}
        onNext={next}
        isResetting={isResetting}
      />
    </motion.div>
  );
};

export default memo(ProjectPanel);
