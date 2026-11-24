import type { CSSProperties, ReactNode } from "react";
import { formatDate, type NumberedProject } from "../lib/timeline";

interface Props {
  project: NumberedProject;
  open: boolean;
  onToggle: (id: string) => void;
}

export function TimelineEntry({ project: p, open, onToggle }: Props) {
  const bodyId = `body-${p.id}`;

  return (
    <li className={`entry${open ? " open" : ""}`}>
      <button
        type="button"
        className="entry-head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => onToggle(p.id)}
      >
        <span className="dot" aria-hidden="true" />
        <span className="entry-main">
          <span className="entry-meta">
            No.{p.no} · {formatDate(p.date)} · {p.category}
          </span>
          <span className="entry-title">{p.title}</span>
          <span className="entry-summary">{p.summary}</span>
        </span>
        <span className="tags">
          {p.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </span>
        <span className="toggle" aria-hidden="true" />
      </button>

      {/* 닫혀 있을 때는 inert 로 키보드 포커스가 안쪽 링크로 들어가지 않게 함 */}
      <div className="entry-body" id={bodyId} role="region" aria-label={`${p.title} 상세`} inert={!open}>
        <div className="inner">
          <div className="detail">
            <dl className="detail-meta">
              {p.company && <MetaRow label="Company">{p.company}</MetaRow>}
              <MetaRow label="Role">{p.role}</MetaRow>
              <MetaRow label="Period">{p.period}</MetaRow>
              <MetaRow label="Stack">{p.stack.join(", ")}</MetaRow>
              {p.links.length > 0 && (
                <MetaRow label="Links">
                  {p.links.map((l, i) => (
                    <span key={l.href + l.label}>
                      {i > 0 && " · "}
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </span>
                  ))}
                </MetaRow>
              )}
            </dl>

            <div className="detail-content">
              {p.imageUrl ? (
                <figure className="thumb has-image">
                  <img src={p.imageUrl} alt={`${p.title} 대표 이미지`} loading="lazy" />
                </figure>
              ) : (
                <figure className="thumb" style={{ "--h": p.hue ?? 220 } as CSSProperties}>
                  <span>IMAGE · {p.title}</span>
                </figure>
              )}

              <section className="detail-section">
                <h4>01 — 문제</h4>
                <p>{p.problem}</p>
              </section>
              <section className="detail-section">
                <h4>02 — 과정</h4>
                <ul>
                  {p.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </section>
              <section className="detail-section">
                <h4>03 — 결과</h4>
                <p>{p.result}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
