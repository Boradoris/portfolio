import React, { useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { CategoryKey } from "@/types";
import { stackList } from "@/constants";

const categories: { key: CategoryKey; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "library", label: "Library" },
  { key: "backend", label: "Backend" },
  { key: "db", label: "DB" },
  { key: "infra", label: "Infra" },
];

const enrichedStackItems = stackList.map(item => ({
  ...item,
  src: new URL(`../../assets/images/skills/${item.icon}`, import.meta.url).href,
}));

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ["easeOut"] } },
};

const AboutCard = () => {
  const [selectedTab, setSelectedTab] = useState<CategoryKey | null>(null);
  const handleTabClick = useCallback((key: CategoryKey) => {
    setSelectedTab(prev => (prev === key ? null : key));
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="container mx-auto p-8 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-none rounded-2xl shadow-xl max-h-screen overflow-y-auto overflow-x-hidden"
    >
      {/* Introduce */}
      <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl text-gray-900 dark:text-white">INTRODUCE</h2>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700 ml-4" />
        </div>
        <div className="space-y-4 text-left">
          <p className="break-words leading-relaxed">
            React/Next.js, TypeScript 등의 여러 기술을 활용한 프로젝트 경험이 있는 프론트엔드
            개발자입니다.
          </p>
          <p className="break-words leading-relaxed">
            프로젝트 과정에서 적극적인 의견 제시를 통해 기획상의 오류나 UI/UX 개선점에 대해 의견을
            공유하고, 이를 해결해 나가는 과정을 좋아합니다.
          </p>
          <p className="break-words leading-relaxed">
            단순히 개발자로서 주어진 업무만 수행하는 것이 아니라,
          </p>
          <p className="break-words leading-relaxed">
            적극적으로 소통하며 사용자 입장에서 서비스를 바라보고 더 나은 사용성을 위해 고민하며
            프로젝트의 완성도를 높이는 것을 중요하게 생각합니다.
          </p>
          <ul className="list-disc list-inside pt-4">
            <li>다양한 웹 서비스의 프론트엔드 프로젝트 기획 참여 및 서비스 런칭 경험 다수</li>
            <li>
              프로젝트 경험을 바탕으로 다양한 직군(기획, 디자인, 마케팅, 백엔드)과 원활한 협업 및
              소통
            </li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl text-gray-900 dark:text-white">SKILL</h2>
        <div className="flex-1 border-t border-gray-200 dark:border-gray-700 ml-4" />
      </div>
      <div className="flex justify-center items-center mb-4 shrink-0">
        {categories.map((cat, idx) => (
          <React.Fragment key={cat.key}>
            {idx > 0 && (
              <span className="mx-2 text-gray-300 dark:text-gray-600 select-none">|</span>
            )}
            <button
              onClick={() => handleTabClick(cat.key)}
              className={`group relative px-5 py-2 text-sm font-medium transition-colors focus:outline-none cursor-pointer ${
                selectedTab === cat.key
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {cat.label}
              <span
                className={`absolute bottom-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                  selectedTab === cat.key ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Icon Grid (전체 카드가 스크롤 대상) */}
      <motion.div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
        {enrichedStackItems.map(item => {
          const isBlurred = selectedTab !== null && item.category !== selectedTab;
          return (
            <motion.div
              key={item.name}
              layout
              className={`flex flex-col items-center justify-center p-2 transition-filter duration-300 ${
                isBlurred ? "filter blur-sm" : ""
              }`}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-white rounded-md overflow-hidden">
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-fill bg-white rounded-md"
                />
              </div>
              <span className="mt-2 text-xs text-center text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default React.memo(AboutCard);
