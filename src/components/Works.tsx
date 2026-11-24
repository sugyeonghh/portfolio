import { useCallback, useMemo, useRef, useState } from "react";
import type { Project, SortOrder } from "../types";
import { groupByYear, numberProjects } from "../lib/timeline";
import { useActiveYear } from "../hooks/useActiveYear";
import { useInView } from "../hooks/useInView";
import { TimelineEntry } from "./TimelineEntry";
import { YearNav } from "./YearNav";

interface Props {
  status: "loading" | "success" | "error";
  projects: Project[];
  error: Error | null;
  onRetry: () => void;
}

const ORDERS: { value: SortOrder; label: string }[] = [
  { value: "desc", label: "최신순" },
  { value: "asc", label: "오래된순" },
];

export function Works({ status, projects, error, onRetry }: Props) {
  const [order, setOrder] = useState<SortOrder>("desc");
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const numbered = useMemo(() => numberProjects(projects), [projects]);
  const groups = useMemo(() => groupByYear(numbered, order), [numbered, order]);
  const years = useMemo(() => groups.map((g) => g.year), [groups]);

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeYear = useActiveYear(timelineRef, years);
  const inView = useInView(sectionRef, "-30% 0px -30% 0px");

  const allOpen = numbered.length > 0 && numbered.every((p) => openIds.has(p.id));

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(numbered.map((p) => p.id)));
  };

  const isInitialLoading = status === "loading" && projects.length === 0;

  return (
    <section id="works" ref={sectionRef} className="works wrap" aria-labelledby="works-title" aria-busy={status === "loading"}>
      <div className="works-head">
        <h2 id="works-title" className="section-title">
          Works
        </h2>
        <div className="controls">
          <div className="segmented" role="group" aria-label="정렬 순서">
            {ORDERS.map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={order === o.value}
                onClick={() => setOrder(o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <button type="button" className="ghost-btn" onClick={toggleAll} disabled={numbered.length === 0}>
            {allOpen ? "모두 접기" : "모두 펼치기"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <div className="notice notice-error" role="alert">
          <p>
            프로젝트를 불러오지 못했습니다.
            <span className="notice-detail">{error?.message}</span>
          </p>
          <button type="button" className="ghost-btn" onClick={onRetry}>
            다시 시도
          </button>
        </div>
      )}

      {isInitialLoading && <TimelineSkeleton />}

      {status === "success" && projects.length === 0 && (
        <div className="notice">
          <p>아직 등록된 프로젝트가 없습니다.</p>
        </div>
      )}

      <div ref={timelineRef} className="timeline">
        {groups.map(({ year, items }) => (
          <section key={year} id={`y${year}`} className="year" data-year={year}>
            <header className="year-head">
              <h3 className="year-label">{year}</h3>
              <p className="year-count">
                {items.length} project{items.length > 1 ? "s" : ""}
              </p>
            </header>
            <ol className="entries">
              {items.map((p) => (
                <TimelineEntry key={p.id} project={p} open={openIds.has(p.id)} onToggle={toggle} />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <YearNav years={years} activeYear={activeYear} visible={inView && years.length > 0} />
    </section>
  );
}

function TimelineSkeleton() {
  return (
    <div className="year skeleton" aria-hidden="true">
      <div className="year-head">
        <div className="sk sk-year" />
      </div>
      <ol className="entries">
        {[0, 1, 2].map((i) => (
          <li key={i} className="entry">
            <div className="entry-head">
              <span className="dot" />
              <span className="entry-main">
                <span className="sk sk-meta" />
                <span className="sk sk-title" />
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
