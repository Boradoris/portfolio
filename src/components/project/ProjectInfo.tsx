import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
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
  isResetting: boolean;
}

const ProjectInfo = ({ slide, current, total, onPrev, onNext, isResetting }: Props) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const progressControls = useAnimation();
  const [textVisible, setTextVisible] = useState(true);

  // 텍스트 컨테이너 ref와 높이 상태
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [textContainerHeight, setTextContainerHeight] = useState<number>(0);

  // Reset 시 텍스트 숨기기
  useEffect(() => {
    if (isResetting) setTextVisible(false);
  }, [isResetting]);

  // 새 슬라이드 로드 시 텍스트 보이기
  useEffect(() => {
    if (!isResetting) setTextVisible(true);
  }, [slide.id, isResetting]);

  // 텍스트가 보이는 순간 컨테이너 높이 측정해 저장
  useLayoutEffect(() => {
    if (textVisible && textContainerRef.current) {
      const { height } = textContainerRef.current.getBoundingClientRect();
      setTextContainerHeight(height);
    }
  }, [slide.id, textVisible]);

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
      {
        icon: <FaStepBackward size={18} />,
        onClick: handlePrev,
        disabled: current === 0,
      },
      {
        icon: isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />,
        onClick: togglePlay,
        disabled: false,
      },
      {
        icon: <FaStepForward size={18} />,
        onClick: handleNext,
        disabled: false,
      },
    ],
    [current, isPlaying]
  );

  // 프로그레스바 애니메이션 관리
  useEffect(() => {
    if (isResetting) {
      progressControls.stop();
      return;
    }
    progressControls.set({ width: 0 });
    if (isPlaying) {
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
  }, [slide.id, isPlaying, onNext, progressControls, isResetting]);

  const [formattedCurrent, formattedTotal] = useMemo(
    () => [String(current + 1).padStart(2, "0"), String(total).padStart(2, "0")],
    [current, total]
  );

  return (
    <div className="flex flex-col items-center w-full max-w-lg px-4 sm:px-6 lg:px-8 mt-8">
      {/* 컨트롤 버튼 */}
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
                ? "p-3 bg-white dark:bg-[#24272b] rounded-full shadow-md focus:outline-none transition opacity-50"
                : "p-3 bg-white dark:bg-[#24272b] rounded-full shadow-md hover:shadow-lg focus:outline-none transition cursor-pointer"
            }
          >
            <span className="text-gray-600 dark:text-gray-200">{btn.icon}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* 인덱스 표시 */}
      <div className="w-full flex justify-between mt-4 mb-1 px-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {formattedCurrent}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {formattedTotal}
        </span>
      </div>

      {/* 프로그레스바 */}
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
        style={{ minHeight: textContainerHeight || undefined, overflow: "visible" }}
      >
        <AnimatePresence mode="wait">
          {textVisible && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center space-y-1"
            >
              <h3 className="truncate text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                {slide.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {slide.period}
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{slide.tech}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(ProjectInfo);
