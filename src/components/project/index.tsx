import React, { useState, useMemo, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProjectInfo from "./ProjectInfo";
import ProjectCard from "./ProjectCard";
import { ProjectT } from "@/types";
import { historyList } from "@/constants";
import ProjectModal from "../ui/modal/ProjectModal";

const slides: ProjectT[] = historyList.flatMap(company => company.projects).reverse();

const ProjectPanel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<ProjectT[]>(slides);
  const [removed, setRemoved] = useState<ProjectT[]>([]);
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
    if (active.length > 1) {
      dirRef.current = 1;
      const last = active[active.length - 1];
      setActive(prev => prev.slice(0, -1));
      setRemoved(prev => [...prev, last]);
    } else {
      dirRef.current = 1;
      setActive(slides);
      setRemoved([]);
    }
  }, [active]);

  const prev = useCallback(() => {
    if (removed.length > 0) {
      dirRef.current = -1;
      const last = removed[removed.length - 1];
      setRemoved(prev => prev.slice(0, -1));
      setActive(prev => [...prev, last]);
    } else {
      dirRef.current = -1;
      const allButLast = slides.slice(0, slides.length - 1);
      const lastCard = slides[slides.length - 1];
      setRemoved(allButLast);
      setActive([lastCard]);
    }
  }, [removed]);

  const total = slides.length;
  const currentIndex = removed.length < total ? removed.length : 0;
  const currentSlide = active.length > 0 ? active[active.length - 1] : slides[0];

  const panelVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    shrink: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-4"
        variants={panelVariants}
        initial="initial"
        animate="shrink"
      >
        <div className="relative w-[20rem] sm:w-[24rem] md:w-[28rem] lg:w-[40rem] xl:w-[36rem] 2xl:w-[48rem] h-[20rem] sm:h-[22rem] md:h-[24rem] lg:h-[28rem] xl:h-[30rem] 2xl:h-[32rem] max-w-full">
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
          setModalOpen={setModalOpen}
          isModalOpen={modalOpen}
        />
      </motion.div>
      {modalOpen && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          project={currentSlide}
        />
      )}
    </>
  );
};

export default memo(ProjectPanel);
