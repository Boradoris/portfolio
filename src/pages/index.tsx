import React, { FC, useEffect, useMemo, useCallback, Suspense } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import HeroPanel from "@/components/hero";
import { Panel } from "@/types";

const ProjectPanel = React.lazy(() => import("@/components/project"));
const AboutPanel = React.lazy(() => import("@/components/about"));
const HistoryPanel = React.lazy(() => import("@/components/history"));

const wrapperVariants: Variants = {
  initial: { justifyContent: "center", alignItems: "center" },
  shrink: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const panelAppearVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// HomePage 컴포넌트: HeroPanel 애니메이션 후 레이아웃 축소 및 URL에 따른 패널 전환 처리
const HomePage: FC = () => {
  const textControls = useAnimation();
  const wrapperControls = useAnimation();
  const introControls = useAnimation();
  const panelControls = useAnimation();

  const location = useLocation();
  const navigate = useNavigate();

  const selected: Panel = useMemo(() => {
    const key = location.pathname.slice(1);
    return key === "about" || key === "history" ? key : "project";
  }, [location.pathname]);

  const onSelect = useCallback(
    (panel: Panel) => {
      const to = panel === "project" ? "/project" : `/${panel}`;
      if (location.pathname !== to) {
        navigate(to);
      }
    },
    [navigate, location.pathname]
  );

  useEffect(() => {
    (async () => {
      await textControls.start("visible");
      await wrapperControls.start("shrink");
      await introControls.start("visible");
      await panelControls.start("visible");
    })();
  }, [selected, textControls, wrapperControls, introControls, panelControls]);

  return (
    <div className="bg-white dark:bg-[#24272b] text-gray-900 dark:text-white min-h-screen flex flex-col font-sans">
      <motion.section
        className="flex w-full h-screen overflow-hidden p-6 rounded-md"
        variants={wrapperVariants}
        initial="initial"
        animate={wrapperControls}
      >
        <HeroPanel
          textControls={textControls}
          wrapperControls={wrapperControls}
          introControls={introControls}
          selected={selected}
          onSelect={onSelect}
        />

        <motion.div
          className="flex-1 flex h-full"
          variants={panelAppearVariants}
          initial="hidden"
          animate={panelControls}
        >
          <Suspense
            fallback={<div className="flex-1 flex items-center justify-center">로딩 중...</div>}
          >
            {selected === "project" && <ProjectPanel />}
            {selected === "about" && <AboutPanel />}
            {selected === "history" && <HistoryPanel />}
          </Suspense>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default React.memo(HomePage);
