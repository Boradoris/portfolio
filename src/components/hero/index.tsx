import React, { useEffect, useState, useCallback } from "react";
import { motion, Variants, useAnimation } from "framer-motion";
import { FiSun, FiMoon, FiUser, FiBriefcase, FiClock } from "react-icons/fi";
import { BiEnvelope } from "react-icons/bi";
import useTypingEffect from "@/hooks/useTypingEffect";
import Toast from "../ui/Toast";
import profileImage from "@/assets/images/profile.png";
import { useTheme } from "@/ThemeContext";
import { Panel } from "@/types";
import { skills } from "@/constants";

type Controls = ReturnType<typeof useAnimation>;

interface Props {
  textControls: Controls;
  wrapperControls: Controls;
  introControls: Controls;
  selected: Panel;
  onSelect: (sel: Panel) => void;
}

const leftPanel: Variants = {
  initial: { scale: 1 },
  shrink: { scale: 0.8, transition: { duration: 0.8, ease: "easeInOut" } },
};
const textContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
const textItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const introItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HeroPanel = ({ textControls, wrapperControls, introControls, selected, onSelect }: Props) => {
  const { theme, toggleTheme } = useTheme();
  const typed = useTypingEffect(skills, true, { pauseDuration: 3000 });
  const [showToast, setShowToast] = useState(false);
  const email = "lllskg1@naver.com";

  useEffect(() => {
    (async () => {
      await textControls.start("visible");
      await wrapperControls.start("shrink");
      await introControls.start("visible");
    })();
  }, [textControls, wrapperControls, introControls]);

  // 이메일 복사 핸들러
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setShowToast(true);
    } catch {
      console.error("이메일 복사 실패");
    }
  }, [email]);

  return (
    <motion.div
      className="relative flex flex-col items-start justify-center w-full h-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-[48rem] min-w-[20rem]"
      variants={leftPanel}
      initial="initial"
      animate={wrapperControls}
      style={{ transformOrigin: "top left" }}
    >
      {/* 우측 테마 & 패널 버튼 */}
      <motion.div
        className="absolute top-1/2 right-[-80px] sm:right-[-100px] flex flex-col items-center space-y-4 sm:space-y-6 transform -translate-y-1/2 m-4"
        variants={introItem}
        initial="hidden"
        animate={introControls}
      >
        <button
          onClick={toggleTheme}
          aria-label="테마 변경"
          className="p-3 sm:p-4 rounded-full focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <FiSun size={24} className="text-white" />
          ) : (
            <FiMoon size={24} className="text-gray-900" />
          )}
        </button>
        <hr className="w-5 sm:w-6 border-t border-gray-300 dark:border-gray-600" />
        {(["about", "portfolio", "history"] as Panel[]).map(panel => {
          const Icon = panel === "about" ? FiUser : panel === "portfolio" ? FiBriefcase : FiClock;
          return (
            <button
              key={panel}
              onClick={() => onSelect(panel)}
              aria-pressed={selected === panel}
              className={`p-3 sm:p-4 rounded-full focus:outline-none ${
                selected === panel
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={24} className={theme === "dark" ? "text-white" : "text-gray-900"} />
            </button>
          );
        })}
      </motion.div>

      {/* 좌측 텍스트 영역 */}
      <div className="ml-4 sm:ml-6 text-left w-full max-w-lg sm:max-w-xl">
        <motion.div
          className="flex items-center"
          variants={textContainer}
          initial="hidden"
          animate={textControls}
        >
          <motion.div variants={introItem} className="flex-shrink-0 w-24 h-24 lg:w-40 lg:h-40">
            <img
              src={profileImage}
              alt="프로필 사진"
              className="object-cover w-full h-full rounded-full"
            />
          </motion.div>
          <div className="flex flex-col pl-4 sm:pl-6">
            <motion.h1
              variants={textItem}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
            >
              안녕하세요 👋
            </motion.h1>
            <motion.h2
              variants={textItem}
              className="mt-1 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center"
            >
              <span className="hidden md:inline">
                {typed}
                <span className="ml-1 font-extrabold">|</span>
              </span>
              <span className="ml-2 font-extrabold whitespace-nowrap">개발자 김동건입니다.</span>
            </motion.h2>
          </div>
        </motion.div>

        {/* 블록 레벨 요소 분리: motion.div 안에 p와 div */}
        <motion.div
          className="mt-12 text-sm sm:text-base md:text-xl leading-relaxed text-gray-900 dark:text-white space-y-4"
          variants={introItem}
          initial="hidden"
          animate={introControls}
        >
          <p>
            이 사이트는
            <br />
            <span className="font-semibold text-blue-500 dark:text-blue-400">
              React + TypeScript + Tailwind CSS
            </span>
            로 만든
            <br />
            개인 포트폴리오입니다.
          </p>
          <p>
            제 작업물을 살펴보시고
            <br />
            <span className="underline decoration-blue-500 dark:decoration-blue-400 underline-offset-4">
              함께 성장할 수 있는 기회
            </span>
            를 주신다면 감사하겠습니다.
          </p>
          <p>궁금한 점은 아래 이메일로 언제든 문의해 주세요!</p>
          <div className="mt-2 flex items-center gap-2">
            <BiEnvelope size={20} className="text-gray-600 dark:text-gray-300" />
            <button
              onClick={handleCopyEmail}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              {email}
            </button>
          </div>
        </motion.div>

        {showToast && (
          <Toast
            message="이메일 주소가 복사되었습니다!"
            onClose={() => setShowToast(false)}
            theme={theme}
          />
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(HeroPanel);
