import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { FiClipboard } from "react-icons/fi";

interface ToastProps {
  message: string;
  onClose: () => void;
  theme: "light" | "dark";
}

const Toast = ({ message, onClose, theme }: ToastProps) => {
  const [leaving, setLeaving] = useState(false);

  // 1초 후 슬라이드아웃 시작
  useEffect(() => {
    const showTimer = window.setTimeout(() => setLeaving(true), 1000);
    return () => clearTimeout(showTimer);
  }, []);

  // 애니메이션(0.3초) 후 onClose 호출
  useEffect(() => {
    if (!leaving) return;
    const hideTimer = window.setTimeout(onClose, 300);
    return () => clearTimeout(hideTimer);
  }, [leaving]);

  const className = useMemo(
    () =>
      [
        "fixed bottom-12 right-8 z-[9999] px-6 py-2 rounded-md shadow-lg text-base font-medium flex items-center gap-2 transition-transform",
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-gray-800 border border-gray-200",
        leaving ? "animate-slide-up-exit" : "animate-slide-up-enter",
      ].join(" "),
    [theme, leaving]
  );

  return ReactDOM.createPortal(
    <div className={className} role="status" aria-live="polite">
      <FiClipboard size={18} className="shrink-0" />
      {message}
    </div>,
    document.body
  );
};

export default React.memo(Toast);
