import type { Project, SortOrder } from "../types";

export interface NumberedProject extends Project {
  /** 오래된 순서로 매긴 번호 ("01", "02" …). 정렬을 바꿔도 유지됨 */
  no: string;
}

export interface YearGroup {
  year: string;
  items: NumberedProject[];
}

export const yearOf = (p: Pick<Project, "date">) => p.date.slice(0, 4);

export const formatDate = (date: string) => date.replace("-", ".");

export function numberProjects(projects: Project[]): NumberedProject[] {
  return [...projects]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((p, i) => ({ ...p, no: String(i + 1).padStart(2, "0") }));
}

export function groupByYear(projects: NumberedProject[], order: SortOrder): YearGroup[] {
  const sorted = [...projects].sort((a, b) =>
    order === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );

  const map = new Map<string, NumberedProject[]>();
  for (const p of sorted) {
    const year = yearOf(p);
    const list = map.get(year);
    if (list) list.push(p);
    else map.set(year, [p]);
  }
  return [...map].map(([year, items]) => ({ year, items }));
}
