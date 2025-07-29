import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { ProjectT } from "@/types";

interface CardProps {
  card: ProjectT & {
    xOffset: number;
    yOffset: number;
    rotateOffset: number;
    scale: number;
    contain?: boolean;
  };
  index: number;
  isTop: boolean;
  onSwipe: () => void;
  dirRef: React.MutableRefObject<number>;
}

const ProjectCard = ({ card, index, isTop, onSwipe, dirRef }: CardProps) => {
  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number } }) => {
      if (Math.abs(info.offset.x) > 100) {
        dirRef.current = info.offset.x > 0 ? 1 : -1;
        onSwipe();
      }
    },
    [dirRef, onSwipe]
  );

  const handleTap = useCallback(() => {
    dirRef.current = 1;
    onSwipe();
  }, [dirRef, onSwipe]);

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onTap={isTop ? handleTap : undefined}
      initial={{
        x: card.xOffset,
        y: card.yOffset + 50,
        scale: 0.9,
        rotate: card.rotateOffset,
        opacity: 0,
      }}
      animate={{
        x: card.xOffset,
        y: card.yOffset,
        scale: card.scale,
        rotate: card.rotateOffset,
        opacity: 1,
        transition: { delay: index * 0.1, type: "spring", stiffness: 200, damping: 25 },
      }}
      exit={{
        x: card.xOffset + dirRef.current * (Math.random() * 200 + 100),
        y: card.yOffset - (Math.random() * 50 + 50),
        rotate: card.rotateOffset + dirRef.current * (Math.random() * 20 + 10),
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      style={{ zIndex: index }}
      className={`absolute inset-0 rounded-xl overflow-hidden shadow-2xl cursor-pointer select-none ${
        card.contain ? "bg-white" : ""
      }`}
    >
      <img
        src={card.image}
        alt={card.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-center ${
          card.contain ? "object-contain" : "object-fill"
        }`}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-black/10 to-black/15" />
    </motion.div>
  );
};

export default memo(ProjectCard);
