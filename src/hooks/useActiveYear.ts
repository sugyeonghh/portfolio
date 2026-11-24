import { useEffect, useState, type RefObject } from "react";

/**
 * container 안의 [data-year] 섹션 중 화면 가운데에 걸친 연도를 반환합니다.
 * years 가 바뀌면(정렬 변경, 데이터 갱신) 다시 관찰합니다.
 */
export function useActiveYear(container: RefObject<HTMLElement | null>, years: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = years.join(",");

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive((entry.target as HTMLElement).dataset.year ?? null);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    root.querySelectorAll<HTMLElement>("[data-year]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [container, key]);

  return active;
}
