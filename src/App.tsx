import { useProjects } from "./hooks/useProjects";
import { About, Footer, Header, Hero } from "./components/Layout";
import { Works } from "./components/Works";

export default function App() {
  const { status, projects, error, reload } = useProjects();

  return (
    <>
      <Header />
      <main id="top">
        {/* 로딩 중이거나 실패했을 때는 통계를 "—" 로 표시 */}
        <Hero projects={projects} loading={status !== "success"} />
        <Works status={status} projects={projects} error={error} onRetry={reload} />
        <About />
      </main>
      <Footer />
    </>
  );
}
