import { useCallback, useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import type { Project } from "../types";

type State =
  | { status: "loading"; projects: Project[]; error: null }
  | { status: "success"; projects: Project[]; error: null }
  | { status: "error"; projects: Project[]; error: Error };

/** 프로젝트 목록을 불러오고 로딩/에러 상태를 관리합니다. */
export function useProjects() {
  const [state, setState] = useState<State>({ status: "loading", projects: [], error: null });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ status: "loading", projects: s.projects, error: null }));

    getProjects(controller.signal)
      .then((projects) => setState({ status: "success", projects, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState((s) => ({
          status: "error",
          projects: s.projects,
          error: err instanceof Error ? err : new Error(String(err)),
        }));
      });

    return () => controller.abort();
  }, [reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { ...state, reload };
}
