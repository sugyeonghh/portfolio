# Portfolio

연도별 세로 타임라인으로 프로젝트를 보여주는 포트폴리오 사이트입니다.

- **프론트엔드**: React 19 + TypeScript + Vite (루트 폴더)
- **백엔드**: Spring Boot (`server/` 폴더)

## 프론트엔드 실행

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 타입 검사 + dist/ 에 정적 파일 생성
npm run preview    # 빌드 결과 미리보기
```

`.env.local`이 없으면 `src/data/mockProjects.ts`의 샘플 데이터로 동작합니다.

## 백엔드 연결

`.env.example`을 `.env.local`로 복사하고 `VITE_USE_MOCK=false`로 바꾼 뒤 `npm run dev`를 다시 시작하세요.

| 변수 | 기본값 | 설명 |
|---|---|---|
| `VITE_USE_MOCK` | `true` | `false`면 실제 API 호출 |
| `VITE_API_BASE_URL` | `/api` | API 기본 경로. 다른 도메인이면 전체 주소 |
| `VITE_API_PROXY_TARGET` | — | 개발 서버가 `/api/*` 요청을 넘겨줄 주소 (예: `http://localhost:8080`) |

개발 중에는 Vite 프록시가 `/api/*`를 백엔드로 넘겨주므로 CORS 설정 없이 테스트할 수 있습니다.
배포 시 프론트와 백엔드 도메인이 다르면 `VITE_API_BASE_URL`에 전체 주소를 넣고 백엔드에서 CORS를 허용하세요.

## 프론트엔드가 기대하는 API

프론트엔드는 현재 아래 엔드포인트 하나만 호출합니다 (`src/api/projects.ts`).

### `GET /api/projects`

프로젝트 전체 목록을 JSON 배열로 반환합니다. 정렬과 연도 그룹핑은 프론트엔드가 하므로 순서는 상관없습니다.

```json
[
  {
    "id": "dashboard",
    "date": "2026-09",
    "title": "사내 데이터 대시보드 구축",
    "summary": "흩어진 운영 지표를 한 화면에 모은 실시간 대시보드",
    "company": "㈜샘플데이터 · 플랫폼개발팀",
    "category": "Web App",
    "role": "프론트엔드 리드 (기여도 70%)",
    "period": "2026.06 – 2026.09 · 4개월",
    "stack": ["React", "TypeScript", "D3.js"],
    "imageUrl": null,
    "hue": 220,
    "problem": "운영팀이 매일 아침 5개의 시스템에서 지표를 수작업으로 모으고 있었습니다.",
    "process": ["운영팀 인터뷰로 지표 12개 선별", "D3 차트 컴포넌트 공통화"],
    "result": "보고 준비 시간을 40분에서 5분으로 줄였습니다.",
    "links": [{ "label": "회고 글", "href": "https://example.com" }]
  }
]
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `id` | string | ✔ | 고유 ID. DOM id로도 쓰이므로 영문·숫자·하이픈 권장 |
| `date` | string | ✔ | `YYYY-MM`. 정렬과 연도 구분 기준 |
| `title` | string | ✔ | 프로젝트 제목 |
| `summary` | string | ✔ | 목록에 보이는 한 줄 요약 |
| `company` | string \| null |  | 소속 회사·조직. 비어 있으면 상세에서 숨김 |
| `category` | string | ✔ | 분야 (예: Web App) |
| `role` | string | ✔ | 맡은 역할 |
| `period` | string | ✔ | 표시용 기간 문자열 |
| `stack` | string[] | ✔ | 기술 태그. 없으면 `[]` |
| `imageUrl` | string \| null |  | 대표 이미지. 없으면 색상 자리 표시 |
| `hue` | number |  | 자리 표시 색상 (0~360, 기본 220) |
| `problem` | string | ✔ | 문제 |
| `process` | string[] | ✔ | 과정 (항목별). 없으면 `[]` |
| `result` | string | ✔ | 결과 |
| `links` | `{label, href}[]` | ✔ | 관련 링크. 없으면 `[]` |

TypeScript 타입 정의는 `src/types.ts`에 있습니다.

**에러**: 2xx가 아니면 화면에 “프로젝트를 불러오지 못했습니다”와 다시 시도 버튼이 표시됩니다.
응답 본문에 `message`(Spring Boot 기본 에러) 또는 `detail`(ProblemDetail) 필드가 있으면 함께 보여줍니다.

## 폴더 구조 (프론트엔드)

```
src/
├─ api/
│  ├─ client.ts         # fetch 래퍼 (기본 경로, 에러 처리)
│  └─ projects.ts       # getProjects(): 샘플 ↔ 실제 API 전환
├─ components/
│  ├─ Layout.tsx        # Header, Hero, About, Footer
│  ├─ Works.tsx         # 정렬·모두 펼치기·로딩/에러 상태 + 연도별 타임라인
│  ├─ TimelineEntry.tsx # 프로젝트 한 줄 + 펼침 상세
│  └─ YearNav.tsx       # 오른쪽 연도 바로가기
├─ data/
│  ├─ mockProjects.ts   # 샘플 프로젝트
│  └─ profile.ts        # 이름·소개·연락처
├─ hooks/               # useProjects, useActiveYear, useInView
├─ lib/timeline.ts      # 번호 매기기, 연도별 그룹핑
├─ types.ts             # Project 타입 = API 응답 형태
└─ styles.css
```

`prototype-vanilla/` 에는 React 이전의 HTML/CSS/JS 버전이 남아 있습니다.
