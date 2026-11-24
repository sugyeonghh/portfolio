/**
 * 공통 HTTP 클라이언트.
 * 인증 토큰, 공통 헤더 등이 필요해지면 이 파일만 수정하면 됩니다.
 */

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "/api").replace(/\/$/, "");

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    // 응답 본문에 message 가 있으면 함께 표시
    // (Spring Boot 기본 에러 응답과 ProblemDetail 은 message 또는 detail 필드를 사용)
    const body = await res.json().catch(() => null);
    const message = body?.message || body?.detail || res.statusText;
    throw new ApiError(res.status, `요청에 실패했습니다 (${res.status}) ${message}`.trim());
  }

  // 204 No Content 대응
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
