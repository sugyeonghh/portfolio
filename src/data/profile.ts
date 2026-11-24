/**
 * 소개·연락처 정보.
 * 나중에 백엔드에서 받아오고 싶다면 src/api 에 getProfile() 을 추가하고
 * App.tsx 에서 이 객체 대신 사용하면 됩니다.
 */
export const profile = {
  name: "홍길동",
  nameEn: "HONG GIL-DONG",
  headline: ["문제를 구조로 풀어내는", "웹 개발자 홍길동입니다."],
  lead:
    "사용자가 겪는 불편을 관찰하고, 이를 명확한 화면과 단단한 코드로 옮기는 일을 합니다. " +
    "아래 타임라인에서 각 프로젝트를 열어 과정과 결과를 확인해 보세요.",
  focus: "Frontend · UX",
  about:
    "컴퓨터공학을 전공하고 스타트업과 에이전시에서 프론트엔드를 담당했습니다. " +
    "화려함보다 오래 쓰기 편한 인터페이스를 좋아하며, 디자이너·기획자와 같은 언어로 " +
    "대화하는 개발자가 되는 것을 목표로 합니다.",
  skills: [
    { label: "Language", value: "TypeScript, JavaScript, HTML, CSS" },
    { label: "Framework", value: "React, Next.js, Vite" },
    { label: "Design", value: "Figma, 디자인 시스템 구축" },
    { label: "Etc.", value: "Git, Vercel, 접근성(WCAG)" },
  ],
  email: "hello@example.com",
  links: [
    { label: "GitHub", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Résumé (PDF)", href: "#" },
  ],
};
