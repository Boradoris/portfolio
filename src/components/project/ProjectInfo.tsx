import React, {
  memo,
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { ProjectT } from "@/types";

interface Props {
  slide: ProjectT;
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  setModalOpen: (open: boolean) => void;
  isModalOpen: boolean;
}

const ProjectInfo = ({
  slide,
  current,
  total,
  onPrev,
  onNext,
  setModalOpen,
  isModalOpen,
}: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const progressControls = useAnimation();

  const textContainerRef = useRef<HTMLDivElement>(null);
  const [textContainerHeight, setTextContainerHeight] = useState<number>(0);

  const techItems = useMemo(() => slide.tech.split(",").map(s => s.trim()), [slide.tech]);
  const techDisplay = useMemo(() => {
    if (techItems.length <= 4) return techItems;
    return [...techItems.slice(0, 4), "..."];
  }, [techItems]);

  useLayoutEffect(() => {
    if (textContainerRef.current) {
      const { height } = textContainerRef.current.getBoundingClientRect();
      setTextContainerHeight(height);
    }
  }, [slide.id]);

  const handlePrev = useCallback(() => {
    if (current > 0) {
      progressControls.stop();
      onPrev();
    }
  }, [current, onPrev, progressControls]);

  const handleNext = useCallback(() => {
    progressControls.stop();
    onNext();
  }, [onNext, progressControls]);

  const togglePlay = useCallback(() => {
    setIsPlaying(p => !p);
  }, []);

  const controls = useMemo(
    () => [
      { icon: <FaStepBackward size={18} />, onClick: handlePrev, disabled: current === 0 },
      {
        icon: isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />,
        onClick: togglePlay,
        disabled: false,
      },
      { icon: <FaStepForward size={18} />, onClick: handleNext, disabled: false },
    ],
    [current, isPlaying, handlePrev, handleNext, togglePlay]
  );

  // 자동 재생: 모달이 열려 있으면 중단
  useEffect(() => {
    progressControls.set({ width: 0 });
    if (isPlaying && !isModalOpen) {
      progressControls.start({
        width: "100%",
        transition: { duration: 5, ease: "linear" },
      });
      const timer = window.setTimeout(onNext, 5000);
      return () => {
        clearTimeout(timer);
        progressControls.stop();
      };
    }
    return () => void progressControls.stop();
  }, [slide.id, isPlaying, progressControls, isModalOpen]);

  const [formattedCurrent, formattedTotal] = useMemo(
    () => [String(current + 1).padStart(2, "0"), String(total).padStart(2, "0")],
    [current, total]
  );

  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4 mt-8">
      <motion.div
        className="inline-flex items-center space-x-4 bg-gray-100 dark:bg-[#1f1f1f] rounded-xl shadow-sm px-4 py-2"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {controls.map((btn, i) => (
          <motion.button
            key={i}
            onClick={btn.disabled ? undefined : btn.onClick}
            disabled={btn.disabled}
            whileHover={btn.disabled ? {} : { scale: 1.15 }}
            whileTap={btn.disabled ? {} : { scale: 0.9 }}
            className={
              btn.disabled
                ? "p-3 bg-white dark:bg-[#24272b] rounded-full shadow-md opacity-50"
                : "p-3 bg-white dark:bg-[#24272b] rounded-full shadow-md hover:shadow-lg cursor-pointer"
            }
          >
            <span className="text-gray-600 dark:text-gray-200">{btn.icon}</span>
          </motion.button>
        ))}
      </motion.div>

      <div className="w-full flex justify-between mt-4 mb-1 px-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {formattedCurrent}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {formattedTotal}
        </span>
      </div>

      <div className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
        <motion.div
          animate={progressControls}
          className="h-full bg-blue-500 dark:bg-blue-400"
          style={{ width: 0 }}
        />
      </div>

      <div
        ref={textContainerRef}
        className="w-full mt-6 px-2 lg:px-4 py-4"
        style={{ minHeight: textContainerHeight || undefined }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group cursor-pointer flex flex-col items-center space-y-1"
            onClick={() => setModalOpen(true)}
          >
            <h3 className="font-semibold text-gray-800 dark:text-white group-hover:underline group-hover:decoration-[1px] whitespace-normal break-words sm:truncate sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis text-[clamp(0.875rem,3.5vw,1rem)] sm:text-[clamp(1rem,3vw,1.25rem)] md:text-[clamp(1.6rem,2.5vw,1.6rem)]">
              {slide.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 group-hover:underline group-hover:decoration-[1px] whitespace-normal break-words sm:truncate sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis text-[clamp(0.75rem,3vw,0.875rem)] sm:text-[clamp(0.875rem,2.5vw,1rem)] md:text-[clamp(1rem,2vw,1.125rem)]">
              {slide.period}
            </p>
            <p className="text-gray-700 dark:text-gray-300 group-hover:underline group-hover:decoration-[1px] whitespace-normal break-words sm:truncate sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis text-[clamp(0.75rem,3vw,0.875rem)] sm:text-[clamp(0.875rem,2.5vw,1rem)] md:text-[clamp(0.95rem,2vw,1.125rem)]">
              {techDisplay.join(", ")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(ProjectInfo);
