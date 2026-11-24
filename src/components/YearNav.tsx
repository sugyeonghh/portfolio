interface Props {
  years: string[];
  activeYear: string | null;
  visible: boolean;
}

/** 넓은 화면(1240px 이상)에서 오른쪽에 고정되는 연도 바로가기 */
export function YearNav({ years, activeYear, visible }: Props) {
  return (
    <nav className={`year-nav${visible ? " visible" : ""}`} aria-label="연도 바로가기">
      <ol>
        {years.map((y) => (
          <li key={y}>
            <a
              href={`#y${y}`}
              className={y === activeYear ? "active" : undefined}
              aria-current={y === activeYear ? "true" : undefined}
            >
              {y}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
