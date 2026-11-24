import type { Project } from "../types";
import { mockProjects } from "../data/mockProjects";
import { request } from "./client";

/** VITE_USE_MOCK=false 로 설정하기 전까지는 샘플 데이터를 사용합니다. */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

/**
 * GET {API_BASE_URL}/projects
 * 응답: Project[] (정렬은 프론트엔드에서 처리하므로 순서 무관)
 */
export async function getProjects(signal?: AbortSignal): Promise<Project[]> {
  if (USE_MOCK) {
    await wait(300, signal); // 로딩 화면 확인용 지연
    return mockProjects;
  }
  return request<Project[]>("/projects", { signal });
}
