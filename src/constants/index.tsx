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
import aireport1 from "@/assets/images/projects/aireport1.png";
import aireport2 from "@/assets/images/projects/aireport2.png";
import aireport3 from "@/assets/images/projects/aireport3.png";
import aireport4 from "@/assets/images/projects/aireport4.png";
import aireport5 from "@/assets/images/projects/aireport5.png";
import lifechange1 from "@/assets/images/projects/lifechange1.png";
import lifechange2 from "@/assets/images/projects/lifechange2.png";
import lifechange3 from "@/assets/images/projects/lifechange3.png";
import lifechange4 from "@/assets/images/projects/lifechange4.png";
import lifechange5 from "@/assets/images/projects/lifechange5.png";
import sso1 from "@/assets/images/projects/sso1.png";
import sso2 from "@/assets/images/projects/sso2.png";
import sso3 from "@/assets/images/projects/sso3.png";
import sso4 from "@/assets/images/projects/sso4.png";
import ir1 from "@/assets/images/projects/ir1.png";
import ir2 from "@/assets/images/projects/ir2.png";
import ir3 from "@/assets/images/projects/ir3.png";
import aircloud1 from "@/assets/images/projects/aircloud1.png";
import aircloud2 from "@/assets/images/projects/aircloud2.png";
import aircloud3 from "@/assets/images/projects/aircloud3.png";
import aircloud4 from "@/assets/images/projects/aircloud4.png";
import aircloud5 from "@/assets/images/projects/aircloud5.png";
import aircloud6 from "@/assets/images/projects/aircloud6.png";
import aircloud7 from "@/assets/images/projects/aircloud7.png";
import jpop from "@/assets/jpop.hwp";

import { CompanyHistoryT, StackItem } from "@/types";

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
        period: "2025.07 ~ 진행중",
        description: "내부망 서비스 풀스택 개발 담당",
        tech: "eGovFrame, Spring, JSP, MyBatis",
        logo: policeLogo,
        details: ["현재 진행 중인 프로젝트입니다."],
        members: "4명 (PM 1, 풀스택 2, 데이터 엔지니어 1)",
        contain: true,
      },
      {
        id: 2,
        title: "VAIV AIR Cloud 서비스 개발",
        period: "2025.05 ~ 2025.07",
        description: "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
        tech: "React, TypeScript, Tailwind CSS, Zustand, Chart.js",
        logo: airLogo,
        details: [
          "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
          "MCP 서버 API 연동을 통한 사용자 입력 키워드 기반 데이터 분석 및 동적 시각화 제공 (리서치 템플릿 서비스)",
          "AI agent를 활용한 세션 연동 실시간 챗봇 서비스 개발 (대화형 리서치 서비스)",
          "키워드-질문셋 코드 매핑, 채널별(유튜브, 블로그, 뉴스 등) 소스 선택 및 조회 기능 개발",
          "그래프, 표, 텍스트 및 SSE(Server-Sent Events) 스트리밍 방식을 통한 실시간 데이터 시각화",
          "Zustand를 이용한 복잡한 상태관리 최적화, 사용자 맞춤형 데이터 리포트 생성 및 편집·PDF 내보내기 기능 구현",
        ],
        members: "7명 (PM 1, 프론트엔드 1, 백엔드 3, 디자인/퍼블리싱 2)",
        images: [
          airLogo,
          aircloud1,
          aircloud2,
          aircloud3,
          aircloud4,
          aircloud5,
          aircloud6,
          aircloud7,
        ],
      },
      {
        id: 3,
        title: "AI Report 웹 구독 서비스 개발",
        period: "2025.01 ~ 2025.04",
        description: "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
        tech: "React, TypeScript, Tailwind CSS, Spring Framework, Thymeleaf, PostgreSQL, Nginx, Jenkins",
        logo: reportLogo,
        details: [
          "프로젝트 설계 및 기획 참여 / 메인 개발 담당",
          "AI 기반 리포트 생성 및 맞춤형 데이터 분석 결과 시각화 기능 구현",
          "REST API 설계 및 JWT 기반 인증·인가 로직 구현",
          "Tailwind CSS 및 React를 활용한 반응형 UI/UX 개발 및 성능 최적화",
          "Nginx, Jenkins를 이용한 CI/CD 파이프라인 구축 및 배포 자동화",
        ],
        members: "4명 (PM 1, 프론트엔드 1, 백엔드 1, 디자인/퍼블리싱 1)",
        url: "https://aireport.vaiv.kr/",
        images: [aireport1, aireport2, aireport3, aireport4, aireport5],
      },
      {
        id: 4,
        title: "외교정보 DB 구축 사업 풀스택 개발",
        period: "2024.09 ~ 2024.12",
        description: "전자정부프레임워크 기반 공공기관 내부 웹 서비스 풀스택 개발 담당",
        tech: "eGovFrame, Spring, JSP, MyBatis, Cubrid, amChart",
        logo: mofaLogo,
        contain: true,
        details: [
          "전자정부프레임워크 기반 공공기관 내부 웹 서비스 풀스택 개발 담당",
          "색인/학습 데이터 DB 검색 기능 개발, 동적 쿼리와 페이징 처리 및 정렬 기능 구현",
          "MyBatis를 활용한 SQL 매핑 처리 및 다단계 트랜잭션 로직 구현",
          "공공기관 요구사항에 따른 사용자 권한별 화면 구성 및 접근 제어 기능 구현",
        ],
        members: "6명 (PM 1, 기획 1, 풀스택 2, 데이터 엔지니어 1, 디자인/퍼블리싱 1)",
      },
      {
        id: 5,
        title: "구독형 웹 서비스 및 관리자 대시보드 개발 - 생활변화관측소",
        period: "2024.04 ~ 2024.08",
        description: "구독형 웹 서비스 및 관리자 대시보드 프론트엔드 메인 개발 담당",
        tech: "Next.js/React, TypeScript, NextAuth, Keycloak, JWT, Recoil/React-Query, Docker, Jenkins",
        logo: lifechangeLogo,
        details: [
          "구독형 웹 서비스 및 관리자 대시보드 프론트엔드 메인 개발 담당",
          "NextAuth와 Keycloak을 활용한 로그인 및 사용자 등급별 콘텐츠 접근 제어 기능 구현",
          "SSR, CSR 방식을 혼합하여 페이지 렌더링 성능 향상 및 SEO 최적화",
          "포트원 PG 결제 솔루션 도입 및 카드 결제 API 연동",
          "무료 템플릿을 활용한 관리자 대시보드 디자인 수정 및 퍼블리싱",
        ],
        members: "5명 (PM 1, 프론트엔드 1, 백엔드 1, 디자인/퍼블리싱 2)",
        url: "https://lifechange.ai/",
        images: [lifechange1, lifechangeLogo, lifechange2, lifechange3, lifechange4, lifechange5],
      },
      {
        id: 6,
        title: "통합 ID 시스템(SSO) 구축",
        period: "2024.02 ~ 2024.06",
        description: "로그인 시스템 프론트엔드 메인 개발 담당",
        tech: "React, TypeScript, Keycloak, JWT, Recoil, Jenkins",
        logo: ssoImg,
        details: [
          "로그인 시스템 프론트엔드 메인 개발 담당",
          "Keycloak 기반 사용자 인증 및 JWT를 이용한 인증 상태 관리 기능 구현",
          "Pass API 연동을 통한 휴대폰 본인인증 기능 개발",
          "OAuth 기반 소셜 로그인(구글, 카카오, 네이버) 연동 및 회원가입 기능 구현",
          "Jenkins 기반 CI/CD 자동화 스크립트 작성 및 적용",
          "자사 웹 서비스 로그인 시스템 통합 (썸트렌드, 생활변화관측소 등)",
        ],
        members: "5명 (PM 1, 프론트엔드 1, 백엔드 1, 디자인/퍼블리싱 2)",
        url: "https://lifechange.ai/login",
        images: [ssoImg, sso1, sso2, sso3, sso4],
      },
      {
        id: 7,
        title: "자사 IR 페이지 및 콘솔 개발 - 투자 정보",
        period: "2023.12 ~ 2024.01",
        description: "투자 정보 페이지 풀스택 개발 담당",
        tech: "Spring Boot, JSP, MySQL, Chart.js",
        logo: irImg,
        details: [
          "외부 API 연동을 통한 주가 정보 조회 및 시각화(Chart.js) 구현",
          "관리자 페이지 개발 및 IR 콘텐츠 CRUD 기능 구현",
        ],
        members: "5명 (기획 1, 풀스택 1, 디자인/퍼블리싱 1)",
        url: "https://www.vaiv.kr/promote/prcenterIR",
        images: [ir1, ir2, ir3],
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
        details: [
          "안드로이드 스튜디오를 이용한 모바일 애플리케이션 개발",
          "일본어 학습을 위한 J-POP 가사 제공 및 퀴즈 기능 구현",
          "Firebase를 이용한 사용자 데이터 저장 및 일본어 학습 진도 관리",
        ],
        members: "2명 (개발 2)",
        logo: androidImg,
        contain: true,
        file: jpop,
        fileName: "J-pop을 활용한 모바일 일본어 학습 애플리케이션의 설계 및 구현.hwp",
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

export const stackList: StackItem[] = [
  // 1) Frontend
  { name: "ES6", icon: "es6.svg", category: "frontend" },
  { name: "JavaScript", icon: "javascript.svg", category: "frontend" },
  { name: "TypeScript", icon: "typescript.svg", category: "frontend" },
  { name: "Vite", icon: "vite.svg", category: "frontend" },
  { name: "React", icon: "react.svg", category: "frontend" },
  { name: "Next.js", icon: "nextjs.svg", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind.svg", category: "frontend" },

  // 2) Library
  { name: "AntDesign", icon: "antdesign.svg", category: "library" },
  { name: "Chart.js", icon: "chartjs.svg", category: "library" },
  { name: "D3", icon: "d3.svg", category: "library" },
  { name: "jQuery", icon: "jquery.svg", category: "library" },
  { name: "React‑Query", icon: "reactQuery.svg", category: "library" },
  { name: "Recoil", icon: "recoil.svg", category: "library" },
  { name: "Zustand", icon: "zustand.svg", category: "library" },

  // 3) Backend
  { name: "Node.js", icon: "nodejs.svg", category: "backend" },
  { name: "Spring", icon: "spring.svg", category: "backend" },
  { name: "Thymeleaf", icon: "thymeleaf.svg", category: "backend" },

  // 4) DB
  { name: "MySQL", icon: "mysql.svg", category: "db" },
  { name: "PostgreSQL", icon: "postgresql.svg", category: "db" },
  { name: "MyBatis", icon: "mybatis.svg", category: "db" },

  // 5) Infra & DevOps
  { name: "Docker", icon: "docker.svg", category: "infra" },
  { name: "GitHub", icon: "github.svg", category: "infra" },
  { name: "GitLab", icon: "gitlab.svg", category: "infra" },
  { name: "Nginx", icon: "nginx.svg", category: "infra" },
];
