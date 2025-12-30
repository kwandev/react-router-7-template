# React Router 7 템플릿

React Router 7(Remix)을 기반으로 한 React 애플리케이션 템플릿입니다.

## 🛠️ 기술 스택

### 핵심 프레임워크

- **React Router 7** (v7.3.0) - 메인 프레임워크, SSR 지원
- **React** (v19.2.1) - 최신 버전의 React
- **TypeScript** (v5.7.2) - 타입 안전성을 위한 언어

### 스타일링

- **TailwindCSS** (v4.1.12) - 유틸리티 우선 CSS 프레임워크
- **Tailwind Merge** - Tailwind 클래스 병합 유틸리티
- **Class Variance Authority** - 컴포넌트 스타일 변형 관리
- 택 1
  - **Daisy UI** - https://daisyui.com
  - **shadcn/ui** - https://ui.shadcn.com

### 데이터베이스

- **MongoDB** (v6.18.0) - NoSQL 데이터베이스

### 인증

- ~~**Clerk**~~

### 개발 도구

- **Vite** (v7.2.6) - 빠른 빌드 도구 및 개발 서버
- **Vitest** (v4.0.16) - 단위, 통합 테스트 도구
- **Prettier** (v3.5.1) - 코드 포맷팅
- **ESLint** (v9.20.1) - 코드 품질 검사
  - TypeScript ESLint 플러그인
  - React Hooks 규칙
  - Import 경로 최적화
- **React Router DevTools** - 개발 디버깅 도구

### 유틸리티 라이브러리

- **Day.js** (v1.11.13) - 날짜/시간 처리
- **Ky** (v1.7.5) - HTTP 클라이언트
- **Lucide React** (v0.483.0) - 아이콘 라이브러리 (shadcn 포함, opt)
- **clsx** - 조건부 클래스 이름 유틸리티

### 프로젝트 분석 및 기타 도구 (opt)

- Vercel Analytics
- Umami
- GA4
- ~~PostHog~~
- ~~Clarity~~
- 구글 서치콘솔

## 🏗️ 프로젝트 구조

Feature-Sliced Design 아키텍처를 따르고 있습니다

```
app/
├── app/            # 프로젝트 구성
├── entities/       # 비즈니스 엔티티
├── features/       # 기능 단위 모듈
├── pages/          # 페이지 컴포넌트
│   └── layouts/    # 레이아웃 컴포넌트
├── shared/         # 공유 리소스
└── widgets/        # 복합 UI 블록
```

## 📁 코드 구성 가이드

- **app/**: Global Styles, Provider 등 앱을 실행하는 모든 요소
- **entities/**: 도메인 엔티티 및 관련 타입, API
- **features/**: 독립적인 기능 모듈
- **pages/**: 라우트에 대응하는 페이지 컴포넌트
- **shared/**: 전역적으로 사용되는 유틸리티, 상수, 타입
- **widgets/**: 여러 기능을 조합한 복합 UI 컴포넌트

---

By. 이경환
