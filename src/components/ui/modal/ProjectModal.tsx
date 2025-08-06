import React, { memo, useCallback, useState, useRef, useMemo, CSSProperties } from "react";
import { ProjectT } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectT;
}

const ProjectModal = memo(function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;
  const images = project.images ?? [];

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleOverlayClick = useCallback(() => onClose(), [onClose]);
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handlePrevPreview = useCallback(() => {
    if (previewIndex === null) return;
    const len = images.length;
    setPreviewIndex(prev => (prev! - 1 + len) % len);
  }, [previewIndex, images.length]);

  const handleNextPreview = useCallback(() => {
    if (previewIndex === null) return;
    const len = images.length;
    setPreviewIndex(prev => (prev! + 1) % len);
  }, [previewIndex, images.length]);

  // 전체 배경 스타일 (로고 + 그라데이션 + 흰색 백그라운드)
  const backgroundStyle = useMemo<CSSProperties>(() => {
    const fallbackColor = "#ffffff";
    const gradientLayer = `linear-gradient(to right, rgba(255,255,255,0) 30%, ${fallbackColor} 50%, ${fallbackColor} 100%)`;
    const imageLayer = `url(${project.logo})`;
    const imageSize = project.contain ? "55% 100%" : "80% 100%";

    return {
      backgroundColor: fallbackColor,
      backgroundImage: `${gradientLayer}, ${imageLayer}`,
      backgroundSize: `100% 100%, ${imageSize}`,
      backgroundPosition: "left center, left center",
      backgroundRepeat: "no-repeat, no-repeat",
    };
  }, [project.logo, project.contain]);

  return (
    <>
      {/* 백드롭 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
        onClick={handleOverlayClick}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          aria-label="닫기"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-600/70 hover:bg-gray-600/90 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-2xl z-20 cursor-pointer"
        >
          ×
        </button>

        {/* 모달 콘텐츠 */}
        <div
          className="modal-content relative w-full max-w-[90vw] sm:max-w-[80vw] min-w-[320px] sm:min-w-[600px] h-[90vh] overflow-hidden rounded-lg shadow-xl"
          style={backgroundStyle}
          onClick={handleContentClick}
        >
          {/* 우측 본문 */}
          <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full overflow-y-auto bg-white px-4 py-6 sm:px-12 sm:py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {project.description && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-8">
                  {project.title}
                </h2>
                <h3
                  id="project-modal-title"
                  className="text-lg sm:text-xl font-semibold text-gray-700 mb-2"
                >
                  프로젝트 설명
                </h3>
                <p className="text-gray-800 whitespace-pre-wrap">{project.description}</p>
              </section>
            )}

            <section className="flex flex-col sm:flex-row sm:space-x-12 pt-4">
              <div className="flex flex-col text-gray-700 text-sm sm:text-base">
                <span className="font-semibold">참여 인원</span>
                <p className="mt-1 text-gray-800">{project.members}</p>
              </div>
              {project.url && (
                <div className="flex flex-col text-gray-700 text-sm sm:text-base mt-4 sm:mt-0">
                  <span className="font-semibold">프로젝트 링크</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 font-medium text-blue-600 hover:underline"
                  >
                    홈페이지 바로가기
                  </a>
                </div>
              )}
              {project.file && (
                <div className="flex flex-col text-gray-700 text-sm sm:text-base mt-4 sm:mt-0">
                  <span className="font-semibold">첨부파일</span>
                  <a
                    href={project.file}
                    download={project.fileName ?? ""}
                    className="mt-1 font-medium text-blue-600 hover:underline"
                  >
                    파일 다운로드
                  </a>
                </div>
              )}
            </section>

            <hr className="border-gray-200 my-6" />

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                📍 주요 기능 및 특징
              </h3>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {project.details?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <hr className="border-gray-200 my-6" />

            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                🛠️ 사용 기술 및 언어
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.split(",").map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </section>

            {images.length > 0 && (
              <>
                <hr className="border-gray-200 my-6" />
                <section className="mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                    🎨 서비스 이미지
                  </h3>
                  <div className="relative">
                    <Swiper
                      modules={[Navigation]}
                      onSwiper={swiper => {
                        swiperRef.current = swiper;
                        setCanPrev(!swiper.isBeginning);
                        setCanNext(!swiper.isEnd);
                      }}
                      onSlideChange={swiper => {
                        setCanPrev(!swiper.isBeginning);
                        setCanNext(!swiper.isEnd);
                      }}
                      slidesPerView={Math.min(images.length, 5)}
                      spaceBetween={10}
                      breakpoints={{
                        640: { slidesPerView: Math.min(images.length, 3) },
                        768: { slidesPerView: Math.min(images.length, 4) },
                        1024: { slidesPerView: Math.min(images.length, 5) },
                      }}
                    >
                      {images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={src}
                            alt={`${project.title} 이미지 ${idx + 1}`}
                            loading="lazy"
                            className="cursor-pointer rounded-lg object-cover w-full h-32 sm:h-40"
                            onClick={() => setPreviewIndex(idx)}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      disabled={!canPrev}
                      aria-label="이전 이미지"
                      className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 z-10 disabled:opacity-50 cursor-pointer"
                    >
                      <FaChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      disabled={!canNext}
                      aria-label="다음 이미지"
                      className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 z-10 disabled:opacity-50 cursor-pointer"
                    >
                      <FaChevronRight size={20} />
                    </button>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewIndex !== null && images.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80"
          onClick={() => setPreviewIndex(null)}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              setPreviewIndex(null);
            }}
            aria-label="닫기"
            className="absolute top-4 right-4 bg-gray-600/70 hover:bg-gray-600/90 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg sm:text-2xl z-20"
          >
            ×
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              handlePrevPreview();
            }}
            aria-label="이전"
            className="absolute top-1/2 -translate-y-1/2 left-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 z-10 cursor-pointer"
          >
            <FaChevronLeft size={20} />
          </button>

          <img
            src={images[previewIndex]!}
            alt={`${project.title} 프리뷰 이미지 ${previewIndex + 1}`}
            className="max-w-full max-h-full"
            onClick={e => e.stopPropagation()}
          />

          <button
            onClick={e => {
              e.stopPropagation();
              handleNextPreview();
            }}
            aria-label="다음"
            className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 z-10 cursor-pointer"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
});

export default ProjectModal;
