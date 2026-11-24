/**
 * 백엔드 API와 주고받는 데이터 형태.
 * 백엔드에서 응답 JSON을 만들 때 이 타입을 기준으로 맞춰 주세요.
 */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  /** 고유 ID (URL·DOM id에 쓰이므로 영문/숫자/하이픈 권장) */
  id: string;
  /** "YYYY-MM" 형식. 정렬과 연도 구분에 사용 */
  date: string;
  title: string;
  /** 목록에 보이는 한 줄 요약 */
  summary: string;
  /** 소속 회사·조직. 없으면 상세에서 해당 줄이 숨겨짐 */
  company?: string | null;
  category: string;
  role: string;
  /** 표시용 기간 문자열 (예: "2026.06 – 2026.09 · 4개월") */
  period: string;
  stack: string[];
  /** 대표 이미지 URL. 없으면 hue 색상의 자리 표시 이미지가 보임 */
  imageUrl?: string | null;
  /** 자리 표시 이미지 색상 (0~360) */
  hue?: number;
  problem: string;
  process: string[];
  result: string;
  links: ProjectLink[];
}

export type SortOrder = "desc" | "asc";
