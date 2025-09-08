"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, get, query, orderByChild } from "firebase/database";
import type { ProjectPayload } from "@/types";

/** participants 안전 카운트 (object | array | undefined 모두 처리) */
function countParticipants(
  participants: ProjectPayload["participants"]
): number {
  if (!participants) return 0;
  if (Array.isArray(participants)) return participants.length;
  if (typeof participants === "object") return Object.keys(participants).length;
  return 0;
}

/** 탭 번호에 맞춰 프로젝트 리스트 필터링 */
function filterByTab(
  projects: ProjectPayload[],
  tab: "1" | "2" | "3"
): ProjectPayload[] {
  switch (tab) {
    case "2": // TEAM PROJECTS → 참여자 2명 이상
      return projects.filter((p) => countParticipants(p.participants) >= 2);
    case "3": // PERSONAL PROJECTS → 참여자 1명 이하
      return projects.filter((p) => countParticipants(p.participants) < 2);
    case "1": // ALL PROJECTS
    default:
      return projects;
  }
}

/** 현재 프로젝트 기준 prev / next 찾기 */
export async function readAdjacentProjects(
  id: string,
  tab: "1" | "2" | "3" = "1"
): Promise<{ prev: ProjectPayload | null; next: ProjectPayload | null }> {
  try {
    const projectsRef = ref(database, "projects");
    const q = query(projectsRef, orderByChild("createdAt"));
    const snap = await get(q);

    if (!snap.exists()) return { prev: null, next: null };

    // 전체 프로젝트 → 탭 필터링 → createdAt 기준 정렬
    let list = Object.values(snap.val()) as ProjectPayload[];
    list = filterByTab(list, tab);
    list.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // 현재 프로젝트 위치 찾기
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return { prev: null, next: null };

    return {
      prev: idx < list.length - 1 ? list[idx + 1] : null,
      next: idx > 0 ? list[idx - 1] : null,
    };
  } catch (err) {
    console.error("readAdjacentProjects error:", err);
    return { prev: null, next: null };
  }
}
