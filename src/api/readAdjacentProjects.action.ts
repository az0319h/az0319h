"use server";

import { database } from "@/firebase/firebaseConfig";
import { ref, get, query, orderByChild } from "firebase/database";
import type { ProjectPayload } from "@/types";

export async function readAdjacentProjects(
  id: string
): Promise<{ prev: ProjectPayload | null; next: ProjectPayload | null }> {
  try {
    const projectsRef = ref(database, "projects");
    const q = query(projectsRef, orderByChild("createdAt"));
    const snap = await get(q);

    if (!snap.exists()) return { prev: null, next: null };

    // 전체 프로젝트 배열로 변환 후 createdAt 기준 정렬
    const allProjects = Object.values(snap.val()) as ProjectPayload[];
    allProjects.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // 현재 프로젝트 위치 찾기
    const idx = allProjects.findIndex((p) => p.id === id);
    if (idx === -1) return { prev: null, next: null };

    return {
      prev: idx < allProjects.length - 1 ? allProjects[idx + 1] : null,
      next: idx > 0 ? allProjects[idx - 1] : null,
    };
  } catch (err) {
    console.error("readAdjacentProjects error:", err);
    return { prev: null, next: null };
  }
}
