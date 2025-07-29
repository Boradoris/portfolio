import vaivLogo from "@/assets/images/vaivLogo.jpg";
import uniLogo from "@/assets/images/uniLogo.png";
import hsLogo from "@/assets/images/hsLogo.png";
import policeLogo from "@/assets/images/policeLogo.png";
import mofaLogo from "@/assets/images/mofaLogo.png";
import airLogo from "@/assets/images/airLogo.png";
import lifechangeLogo from "@/assets/images/lifechangeLogo.png";
import ssoImg from "@/assets/images/ssoImg.png";
import reportLogo from "@/assets/images/reportLogo.png";
import irImg from "@/assets/images/irImg.png";
import androidImg from "@/assets/images/androidImg.png";

import { CompanyHistoryT } from "@/types";

export const historyList: CompanyHistoryT[] = [
  {
    id: 1,
    company: "㈜ 바이브컴퍼니",
    logo: vaivLogo,
    position: "AI부문 · 매니저 2년차 · 웹개발",
    duration: "2023.09 ~ 재직중",
    projects: [
      {
        id: 1,
        title: "경찰청 법무·지식정보 지능형 검색 서비스 개발",
        period: "2025.07 ~",
        description: "내부망 서비스 풀스택 개발 담당",
        tech: "Spring, MyBatis, Thymeleaf, Oracle",
        image: policeLogo,
        contain: true,
      },
      {
        id: 2,
        title: "VAIV AIR Cloud 서비스 개발",
        period: "2025.05 ~ 2025.07",
        description: "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
        tech: "Next.js, TypeScript, Zustand, Tailwind CSS",
        image: airLogo,
      },
      {
        id: 3,
        title: "AI Report 웹 구독 서비스 개발",
        period: "2025.01 ~ 2025.04",
        description: "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
        tech: "Next.js, TypeScript, Tailwind CSS",
        image: reportLogo,
      },
      {
        id: 4,
        title: "외교정보 DB 구축 사업 풀스택 개발",
        period: "2024.09 ~ 2024.12",
        description: "전자정부프레임워크 기반 공공기관 내부 웹 서비스 풀스택 개발 담당",
        tech: "eGovFrame, JSP, Spring, Oracle",
        image: mofaLogo,
        contain: true,
      },
      {
        id: 5,
        title: "구독형 웹 서비스 및 관리자 대시보드 개발 - 생활변화관측소",
        period: "2024.04 ~ 2024.08",
        description: "구독형 웹 서비스 및 관리자 대시보드 프론트엔드 메인 개발 담당",
        tech: "React, TypeScript, Recoil, Chart.js",
        image: lifechangeLogo,
      },
      {
        id: 6,
        title: "통합 ID 시스템(SSO) 구축",
        period: "2024.02 ~ 2024.06",
        description: "로그인 시스템 프론트엔드 메인 개발 담당",
        tech: "React, TypeScript, OAuth2.0",
        image: ssoImg,
      },
      {
        id: 7,
        title: "자사 IR 페이지 및 콘솔 개발 - 투자 정보",
        period: "2023.12 ~ 2024.01",
        description: "투자 정보 페이지 풀스택 개발 담당",
        tech: "Next.js, TypeScript, Tailwind CSS",
        image: irImg,
      },
    ],
  },
  {
    id: 2,
    company: "부산가톨릭대학교",
    logo: uniLogo,
    position: "소프트웨어학과 · 졸업",
    duration: "2017.03 ~ 2023.02",
    projects: [
      {
        id: 8,
        title: "J-POP을 활용한 일본어 학습 모바일 애플리케이션 설계 및 구현",
        period: "2022.02 ~ 2024.05",
        description: "한국 통신 학회 2022년도 추계종합학술발표회 논문 제출 / 팀장",
        tech: "Android Studio, Firebase",
        image: androidImg,
      },
    ],
  },
  {
    id: 3,
    company: "창원경일고등학교",
    logo: hsLogo,
    position: "이과계열 · 졸업",
    duration: "2014.03 ~ 2017.02",
    projects: [],
  },
];

export const skills = ["Front", "React", "JSP", "NEXT.JS"];
