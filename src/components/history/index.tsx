import React from "react";
import { motion, Variants } from "framer-motion";
import { FiCpu } from "react-icons/fi";
import { historyList } from "@/constants";

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  shrink: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HistoryPanel = () => (
  <motion.div
    className="relative w-full h-full py-6 px-8 bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-none rounded-2xl shadow-lg overflow-hidden"
    variants={variants}
    initial="initial"
    animate="shrink"
  >
    {/* 고정된 타임라인 수직선 */}
    <div className="absolute left-12 top-6 bottom-6 border-l border-gray-300 dark:border-gray-600" />

    <div className="h-full overflow-y-auto pl-16 pr-6">
      {historyList.map(company => (
        <div key={company.id} className={`relative ${company.projects.length > 0 ? "mb-12" : ""}`}>
          {/* 타임라인 점 */}
          <span className="absolute left-[-47px] top-1 bg-blue-500 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

          {/* 회사 정보 */}
          <div className="flex items-center gap-6 mb-6">
            <img
              src={company.logo}
              alt={`${company.company} 로고`}
              className="w-16 h-16 object-contain rounded-full border border-gray-200 dark:border-gray-700 bg-white p-1"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {company.company}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{company.position}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{company.duration}</p>
            </div>
          </div>

          {/* 프로젝트 리스트 */}
          {company.projects.map(proj => (
            <div key={proj.id} className="mb-10">
              <div className="bg-white dark:bg-[#24272b] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {proj.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{proj.period}</span>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{proj.description}</p>

                {/* 기술스택 라벨 */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 min-w-max">
                    <FiCpu className="mr-1" />
                    <span className="font-semibold whitespace-nowrap">기술스택:</span>
                  </div>
                  <div className="px-4 py-[6px] bg-gray-100 dark:bg-gray-800 rounded-md text-sm text-gray-800 dark:text-gray-200 inline-block">
                    {proj.tech.split(", ").join(" / ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

export default React.memo(HistoryPanel);
